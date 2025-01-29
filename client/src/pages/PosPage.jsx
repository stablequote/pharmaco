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
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import CartOverview from "../components/CartOverview";
import CartPaymentSection from "../components/CartPaymentSection";

// Sample product database
const products = [
  { id: "1234", name: "Paracetamol 500mg",  quantity: 1, price: 50 },
  { id: "5678", name: "Ibuprofen 200mg", quantity: 1, price: 100 },
  // { id: "9101", name: "Vitamin C 100mg",  quantity: 3,price: 30 },
  // { id: "1123", name: "Cough Syrup 100ml",  quantity: 1,price: 80 },
  // { id: "3456", name: "Antacid Tablets", quantity: 6, price: 60 },
];

const PosPage = () => {
  const [scannedItem, setScannedItem] = useState(null); // Currently scanned item
  const [cart, setCart] = useState(products); // Cart items
  const [scannerModalOpened, setScannerModalOpened] = useState(false); // Scanner modal state
  const [receiptVisible, setReceiptVisible] = useState(false); // Receipt modal visibility
  const html5QrCodeRef = useRef(null); // Reference for the barcode scanner
  const lastScannedRef = useRef(null); // To track the last scanned barcode
  const [barcode, setBarcode] = useState("");
  const scannerRef = useRef(null);
  const [payment, setPayment] = useState({
      netTotal: 0,
      discount: 0,
      previous: 0,
      paidAmount: 0,
      dueAmount: 0,
      paymentType: "Cash",
    });

  useEffect(() => {
    if (scannerModalOpened) {
      startScanner();
    } else {
      stopScanner();
    }
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
    return cart.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const updateQuantity = (id, action) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: action === "increment" ? item.quantity + 1 : item.quantity - 1,
            }
          : item
      ).filter((item) => item.quantity > 0)
    );
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

  return (
    <div style={{ padding: "20px", overflow: "hidden !important" }}>
      <Grid gutter="lg">
        {/* Left Side: Scanned Item */}
        <Col xs={12} md={8}>
          <Group position="apart" mb="md">
            <Title order={3}>Scanned Item</Title>
            <Button onClick={() => setScannerModalOpened(true)}>Start Scan</Button>
          </Group>
          <Card shadow="sm" p="lg" style={{ textAlign: "center" }}>
            {scannedItem ? (
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
            )}
          </Card>
          
          {/* Modal for Scanner */}
          <Container py="lg" >
            <div id="reader" style={{margin: '0 auto', width: '30%'}} />
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
            />
        </Col>
      </Grid>


      {/* Modal for Receipt */}
      <Modal
        opened={receiptVisible}
        onClose={resetProcess}
        title="Receipt"
        centered
      >
        <Paper>
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
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Text mt="md" weight={700}>
            Total Amount Paid: ${calculateNetTotal()}
          </Text>
        </Paper>
        <Button mt="md" fullWidth onClick={resetProcess}>
          New Transaction
        </Button>
      </Modal>
    </div>
  );
};

export default PosPage;
