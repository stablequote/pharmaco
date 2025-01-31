import { v4 as uuidv4 } from 'uuid'; // Use the 'uuid' package to generate unique IDs

// Helper function to generate a 4- or 5-digit ID
const generateShortID = () => {
  const uuid = uuidv4(); // Generate a full UUID
  const shortID = parseInt(uuid.replace(/-/g, '').slice(0, 5), 16) % 90000 + 10000; // Create a 5-digit ID
  return shortID.toString();
};

export const data = [
  {
    id: generateShortID(),
    product: "Paracetamol",
    quantity: 100,
    unit: "tablet",
    expiryDate: "2025-12-31",
    price: 50.0,
    salePrice: 60.0,
    shelf: "A1",
  },
  {
    id: generateShortID(),
    product: "Ibuprofen",
    quantity: 200,
    unit: "tablet",
    expiryDate: "2026-05-15",
    price: 40.0,
    salePrice: 50.0,
    shelf: "B3",
  },
  {
    id: generateShortID(),
    product: "Amoxicillin",
    quantity: 150,
    unit: "capsule",
    expiryDate: "2024-08-20",
    price: 75.0,
    salePrice: 85.0,
    shelf: "C2",
  },
  {
    id: generateShortID(),
    product: "Cough Syrup",
    quantity: 50,
    unit: "ml",
    expiryDate: "2025-02-28",
    price: 120.0,
    salePrice: 150.0,
    shelf: "D4",
  },
  {
    id: generateShortID(),
    product: "Vitamin C",
    quantity: 300,
    unit: "tablet",
    expiryDate: "2026-11-10",
    price: 30.0,
    salePrice: 40.0,
    shelf: "E5",
  },
  {
    id: generateShortID(),
    product: "Insulin",
    quantity: 100,
    unit: "vial",
    expiryDate: "2025-04-01",
    price: 250.0,
    salePrice: 300.0,
    shelf: "F1",
  },
  {
    id: generateShortID(),
    product: "Antacid",
    quantity: 80,
    unit: "tablet",
    expiryDate: "2024-12-15",
    price: 25.0,
    salePrice: 35.0,
    shelf: "G2",
  },
  {
    id: generateShortID(),
    product: "Antiseptic Cream",
    quantity: 40,
    unit: "tube",
    expiryDate: "2025-07-20",
    price: 85.0,
    salePrice: 100.0,
    shelf: "H3",
  },
  {
    id: generateShortID(),
    product: "Ceftriaxone Injection",
    quantity: 60,
    unit: "vial",
    expiryDate: "2025-09-25",
    price: 500.0,
    salePrice: 550.0,
    shelf: "I4",
  },
  {
    id: generateShortID(),
    product: "Eye Drops",
    quantity: 120,
    unit: "bottle",
    expiryDate: "2026-01-15",
    price: 100.0,
    salePrice: 120.0,
    shelf: "J1",
  },
  {
    id: generateShortID(),
    product: "Pain Relief Gel",
    quantity: 90,
    unit: "tube",
    expiryDate: "2024-10-01",
    price: 110.0,
    salePrice: 135.0,
    shelf: "K2",
  },
  {
    id: generateShortID(),
    product: "Multivitamins",
    quantity: 220,
    unit: "tablet",
    expiryDate: "2026-03-30",
    price: 80.0,
    salePrice: 100.0,
    shelf: "L3",
  },
  {
    id: generateShortID(),
    product: "Antihistamine",
    quantity: 70,
    unit: "tablet",
    expiryDate: "2024-05-15",
    price: 45.0,
    salePrice: 55.0,
    shelf: "M4",
  },
  {
    id: generateShortID(),
    product: "Anti-Fungal Cream",
    quantity: 50,
    unit: "tube",
    expiryDate: "2025-11-22",
    price: 95.0,
    salePrice: 120.0,
    shelf: "N5",
  },
  {
    id: generateShortID(),
    product: "Oral Rehydration Salts",
    quantity: 130,
    unit: "packet",
    expiryDate: "2026-07-10",
    price: 15.0,
    salePrice: 25.0,
    shelf: "O6",
  },
];

export const productsData = [
  { id: "1234", name: "Paracetamol 500mg", quantity: 1, price: 50, barcode: "6251065033005" },
  { id: "5678", name: "Ibuprofen 200mg", quantity: 1, price: 100, barcode: "6251065033006" },
  { id: "9101", name: "Vitamin C 100mg", quantity: 3, price: 30, barcode: "6251065033007" },
  { id: "1123", name: "Cough Syrup 100ml", quantity: 1, price: 80, barcode: "6251065033008" },
  { id: "3456", name: "Antacid Tablets", quantity: 6, price: 60, barcode: "6251065033009" },
  { id: "7890", name: "Aspirin 100mg", quantity: 2, price: 70, barcode: "6251065033010" },
  { id: "1122", name: "Cold & Flu Tablets", quantity: 4, price: 110, barcode: "6251065033011" },
  { id: "2233", name: "Vitamin D 1000IU", quantity: 5, price: 40, barcode: "6251065033012" },
  { id: "3344", name: "Allergy Tablets", quantity: 3, price: 120, barcode: "6251065033013" },
  { id: "4455", name: "Multivitamins 60ct", quantity: 2, price: 90, barcode: "6251065033014" },
  { id: "5566", name: "Pain Relief Cream", quantity: 1, price: 150, barcode: "6251065033015" },
  { id: "6677", name: "Antiseptic Cream", quantity: 1, price: 80, barcode: "6251065033016" },
  { id: "7788", name: "Cough Lozenges", quantity: 4, price: 35, barcode: "6251065033017" },
  { id: "8899", name: "Sleep Aid 10mg", quantity: 2, price: 60, barcode: "6251065033018" },
  { id: "9900", name: "Digestive Enzymes", quantity: 3, price: 55, barcode: "6251065033019" }
];