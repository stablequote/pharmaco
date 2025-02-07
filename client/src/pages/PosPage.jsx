import React, { useState, useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import {
  Card,
  Group,
  Text,
  Button,
  Table,
  Title,
  Modal,
  Paper,
  Notification,
  Grid,
  Col,
  Box,
  Divider,
  NumberInput,
  Select,
  Center,
  Container,
  Flex,
} from "@mantine/core";
import { useMediaQuery } from '@mantine/hooks';
import { showNotification } from "@mantine/notifications";
import CartOverview from "../components/CartOverview";
import CartPaymentSection from "../components/CartPaymentSection";
import BarcodeScan from "../components/BarcodeScan";
import axios from 'axios'
import { jsPDF } from "jspdf";

// const isMobile = useMediaQuery('(max-width: 375px)');

// Sample product database
const products = [
  { _id: "679b92a0633d92d38e46c275",
    product: "Digestive Enzymes",
    quantity: 3,
    unit: "stripe",
    expiryDate: "2026-11-08T22:00:00.000Z",
    unitPurchasePrice: 900,
    unitSalePrice: 1300,
    shelf: "A1",
    barcodeID: "6154840000000",
    "createdAt": "2025-01-30T14:54:24.234Z",
    "updatedAt": "2025-01-31T14:48:28.414Z",},
  { _id: "5678", product: "Pain Relief Cream", quantity: 1, unit: "lotion", unitPurchasePrice: 1100, unitSalePrice: 1900, barcodeID: "9268839786736" },
  // { _id: "9101", name: "Vitamin C 100mg",  quantity: 3, unitSalePrice: 30, barcodeID: "3632839390600" },
  // { _id: "1123", name: "Cough Syrup 100ml",  quantity: 1, unitSalePrice: 80, barcodeID: "7794465889647" },
  // { _id: "3456", name: "Antacid Tablets", quantity: 6, unitSalePrice: 60, barcodeID: "7497866254327" },
];

const PosPage = () => {
  const [scannedItem, setScannedItem] = useState(null); // Currently scanned item
  const [cart, setCart] = useState([]); // Cart items
  const [scannerModalOpened, setScannerModalOpened] = useState(false); // Scanner modal state
  const [receiptVisible, setReceiptVisible] = useState(false); // Receipt modal visibility
  const html5QrCodeRef = useRef(null); // Reference for the barcode scanner
  const lastScannedRef = useRef(null); // To track the last scanned barcode
  const [barcode, setBarcode] = useState([]);
  const [scanner, setScanner] = useState(false);
  const scannerRef = useRef(null);
  const receiptRef = useRef(null);
  const [payment, setPayment] = useState({
      netTotal: 0,
      discount: 0,
      previous: 0,
      paidAmount: 0,
      dueAmount: 0,
      paymentType: "Cash",
    });
  const [paymentResponse, setPaymentResponse] = useState(null)
  const BASE_URL = import.meta.env.VITE_URL;
  
  useEffect(() => {
    if (scannerModalOpened) {
      startScanner();
    } else {
      stopScanner();
    }
    console.log(cart)
  }, [scannerModalOpened]);

  const startScanner = async () => {
    if (!html5QrCodeRef.current) {
      const readerElement = document.getElementById("reader");
      if (!readerElement) {
        showNotification({
          title: "Scanner Error",
          message: "Scanner container element not found.",
          color: "red",
        });
        return;
      }

      try {
        scannerRef.current = new Html5QrcodeScanner("reader", {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        });

        scannerRef.current.render(
          (decodedText) => {
            setBarcode(decodedText);
            console.log("Decoded barcode:", decodedText);
          },
          (error) => {
            console.warn("Scan error:", error);
          }
        );
      } catch (err) {
        console.error("Failed to start scanner:", err);
        showNotification({
          title: "Camera Error",
          message: "Unable to access the camera. Please check permissions.",
          color: "red",
        });
      }
    }
  };

  const stopScanner = async () => {
    if (html5QrCodeRef.current) {
      await html5QrCodeRef.current.stop();
      html5QrCodeRef.current.clear();
      html5QrCodeRef.current = null;
    }
    setScannerModalOpened(false);
  };

  const handleScanSuccess = (barcode) => {
    const now = Date.now();
    if (lastScannedRef.current && now - lastScannedRef.current < 2000) {
      return; // Ignore duplicate scan
    }
    lastScannedRef.current = now;

    const product = products.find((p) => p.id === barcode);

    if (product) {
      setScannedItem(product);
      addToCart(product);
      showNotification({
        title: "Item Added",
        message: `${product.name} was added to the cart.`,
        color: "green",
      });
    } else {
      showNotification({
        title: "Invalid Barcode",
        message: `No product found for barcode: ${barcode}`,
        color: "red",
      });
    }
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const calculateNetTotal = () => {
    return cart.reduce((total, item) => total + item.quantity * item.unitSalePrice, 0);
  };
  
  const updateQuantity = (id, action) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: action === "increment" ? item.quantity + 1 : item.quantity - 1,
            }
          : item
      ).filter((item) => item.quantity > 0)
    );
    console.log(id)
  };

  const finishTransaction = () => {
    stopScanner();
    setReceiptVisible(true);
  };

  const resetProcess = () => {
    setScannedItem(null);
    setCart([]);
    setReceiptVisible(false);
  };

  const handleBarcode = async (data) => {
    setBarcode(data);
    try {
      const baseUrl = `${BASE_URL}/inventory/search`
      const response = await axios.get(`${baseUrl}/${data}`);
      console.log(response)
  
      if (response.status === 200) {
        const product = response.data;
        setCart((prevCart) => {
          const existingProduct = prevCart.find((item) => item.barcodeID === product.barcodeID);
          if (existingProduct) {
            return prevCart.map((item) =>
              item.barcodeID === product.barcodeID
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          }
          console.log(cart)
          return [...prevCart, { ...product, quantity: 1 }];
        });
  
        showNotification({
          title: "Item Added",
          message: `${product.product} was added to the cart.`,
          color: "green",
        });
      } else {
        showNotification({
          title: "Product Not Found",
          message: "No product found for this barcode.",
          color: "red",
        });
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const resetCart = async () => {
    console.log(cart)
    setCart([])
    console.log(cart)
  }

  const handlePrint = () => {
    if (receiptRef.current) {
      const printWindow = window.open("", "_blank");
      printWindow.document.write(`
        <html>
          <head>
            <title>Receipt</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h2 { text-align: center; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { border: 1px solid black; padding: 10px; text-align: left; }
              th { background-color: #f2f2f2; }
              .total { font-weight: bold; }
            </style>
          </head>
          <body>
            <h2>Kambal Pharmacy Receipt</h2>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                ${cart
                  .map(
                    (item) => `
                    <tr>
                      <td>${item.product}</td>
                      <td>${item.quantity}</td>
                      <td>SDG ${item.unitSalePrice}</td>
                    </tr>
                  `
                  )
                  .join("")}
                <tr class="total">
                  <td colspan="2">Total</td>
                  <td>SDG ${calculateNetTotal()}</td>
                </tr>
              </tbody>
            </table>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handlePrintThermal = async () => {
    try {
      // Request access to the thermal printer
      const device = await navigator.usb.requestDevice({
        filters: [{ vendorId: 0x0416 }], // Replace with your printer's vendor ID
      });
  
      await device.open();
      if (device.configuration === null) {
        await device.selectConfiguration(1);
      }
      await device.claimInterface(0);
  
      // ESC/POS Command Generator
      const encoder = new TextEncoder();
      const ESC = "\x1B"; // ESC command
      const LF = "\x0A"; // Line feed (new line)
      const CUT = ESC + "m"; // Cut command
  
      let receipt = ESC + "a1"; // Align center
      receipt += "XYZ Pharmacy" + LF;
      receipt += "1234 Main Street" + LF;
      receipt += "City, Country" + LF;
      receipt += "--------------------------------" + LF;
      receipt += `Receipt No: INV-${Date.now()}` + LF;
      receipt += `Date: ${new Date().toLocaleString()}` + LF;
      receipt += "--------------------------------" + LF;
  
      // Add cart items
      cart.forEach((item) => {
        receipt += `${item.product} x${item.quantity}  $${(item.unitSalePrice * item.quantity).toFixed(2)}` + LF;
      });
  
      receipt += "--------------------------------" + LF;
      receipt += `Total: $${calculateNetTotal().toFixed(2)}` + LF;
      receipt += "--------------------------------" + LF;
      receipt += "Thank you for shopping with us!" + LF;
      receipt += "Visit again!" + LF;
      receipt += CUT; // Cut the paper
  
      // Convert text to bytes
      const receiptBytes = encoder.encode(receipt);
  
      // Send data to the printer
      await device.transferOut(1, receiptBytes);
  
      showNotification({
        title: "Printing",
        message: "Receipt is being printed...",
        color: "green",
      });
  
      await device.close();
    } catch (error) {
      console.error("Print error:", error);
      showNotification({
        title: "Print Error",
        message: "Could not print the receipt. Please check printer connection.",
        color: "red",
      });
    }
  };

const autoPrintPDF = () => {
  const doc = new jsPDF();
  doc.text("Your Receipt Here", 10, 10);
  
  // Auto-save the PDF
  doc.autoPrint();
  window.open(doc.output("bloburl"), "_blank");
};

const preparePaymentData = (cart) => {
  return {
    modeOfPayment: "bankak",
    soldBy: "Asaad",
    branch: "Thawra 30",
    items: cart.map(item => ({
      product: item.product,
      quantity: item.quantity,
      unit: item.unit,
      unitSalePrice: item.unitSalePrice,
      unitPurchasePrice: item.unitPurchasePrice,
      barcodeID: item.barcodeID
      // totalPrice: item.quantity * item.unitSalePrice // Optional, if needed by server
    })),
    billID: `BILL - ${Date.now()}`,
  };
};

const paymentPayload = preparePaymentData(cart);
console.log(paymentPayload); 

const handlePayment = async () => {
  const url = `${BASE_URL}/sales/make-sale`
  console.log(paymentPayload)

  try {
    if(cart.length <= 0) {
      showNotification({
        title: "No item!",
        message: "At least one item should be added",
        color: "red",
      })
      return;
    }
    
      const result = await axios.post(url, paymentPayload, {
        // headers: {
        //   'Content-Type': 'application/json',
        // },
      });
      console.log(result)
  
      setPaymentResponse(result.data); // Handle the response from the server
      if(result.status === 201) {
        showNotification({
          title: "Successful",
          message: "Payment was successfully made",
          color: "green",
        })
        setReceiptVisible(!receiptVisible)
        console.log("successful", result)
    
      } else {
        showNotification({
          title: "server error",
          message: "maybe check again!",
          color: "red",
        })
      }
  } catch (err) {
    console.log(err.response.status)

    if (err.response.status === 400) {
      console.log(err.response.data.message)
      showNotification({
        title: err.response.data.message,
        message: err.response.data.errors.map((err) => err),
        color: "orange",
    })
  } else {
    showNotification({
      title: "Payment error",
      message: "Error while making payment. Please try again",
      color: "red",
    })
  }
  }
}

  return (
    <div style={{ padding: "20px", overflow: "hidden !important" }}>
      <Grid gutter="lg">
        {/* Left Side: Scanned Item */}
        <Col xs={12} md={8}>
          <Group position="apart" mb="md">
            <Title order={3}>Scanned Item</Title>
            <Button onClick={() => setScanner(!scanner)}>{scanner === true? 'Stop scanner' : 'Start scanner'}</Button>
          </Group>
          <Card shadow="sm" p="lg" style={{ textAlign: "center" }}>
            {/* {scannedItem ? (
              <>
                <Text size="lg" weight={700}>
                  {scannedItem.name}
                </Text>
                <Text size="md" color="dimmed">
                  Price: ${scannedItem.price}
                </Text>
              </>
            ) : (
              <Text>No item scanned yet</Text>
            )} */}

            {barcode && <Text>{barcode}</Text>}
          </Card>
          

          {/* Modal for Scanner */}
          <Container py="lg" >
            {/* <div id="reader" style={{margin: '0 auto', width: '30%'}} /> */}
            {scanner && <BarcodeScan barcode={barcode} handleBarcode={handleBarcode} /> }
          </Container>
        </Col>

        {/* Right Side: Cart Overview */}
        <Col xs={12} md={4}>
            {/* Overview Section */}
            <CartOverview 
              cart={cart}
              updateQuantity={updateQuantity}
            />
      
            {/* Payment Section */}
            <CartPaymentSection
              calculateNetTotal={calculateNetTotal}
              payment={payment}
              setPayment={setPayment}
              setReceiptVisible={setReceiptVisible}
              receiptVisible={receiptVisible}
              resetCart={resetCart}
              cart={cart}
              handlePayment={handlePayment}
            />
        </Col>
      </Grid>


      {/* Modal for Receipt */}
      <Modal
        opened={receiptVisible}
        onClose={() => setReceiptVisible(!receiptVisible)}
        title="Receipt"
        centered
      >
        <Paper ref={receiptRef}>
          <Title order={4}>Customer Receipt</Title>
          <Table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, i) => (
                <tr key={i}>
                  <td>{item.product}</td>
                  <td>{item.quantity}</td>
                  <td>SDG {item.unitSalePrice * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Text mt="md" weight={700}>
            Total Amount Paid: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; SDG {calculateNetTotal()}
          </Text>
        </Paper>
        <Flex justify="space-between"  >
          <Button mt="md" color="blue" onClick={resetProcess}>New Transaction</Button>
          <Button mt="md" color="gray" onClick={() => handlePrint()}>Print</Button>
        </Flex>
      </Modal>
    </div>
  );
};

export default PosPage;
