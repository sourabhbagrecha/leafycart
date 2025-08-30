import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "../hooks/useAxios";

const AdminContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #2d3748;
  margin-bottom: 2rem;
  text-align: center;
`;

const FormContainer = styled(motion.div)`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const FormTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: grid;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
  color: #4a5568;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #2c5282;
    box-shadow: 0 0 0 2px rgba(44, 82, 130, 0.1);
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.2s;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #2c5282;
    box-shadow: 0 0 0 2px rgba(44, 82, 130, 0.1);
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #2c5282;
    box-shadow: 0 0 0 2px rgba(44, 82, 130, 0.1);
  }
`;

const SubmitButton = styled(motion.button)`
  background: linear-gradient(135deg, #2c5282, #3182ce);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  justify-self: start;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled(motion.div)`
  background: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  color: #155724;
  font-weight: 500;
`;

const ErrorMessage = styled(motion.div)`
  background: #f8d7da;
  border: 1px solid #f1aeb5;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  color: #721c24;
  font-weight: 500;
`;

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
}

export default function Admin() {
  const axiosClient = useAxios();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    price: 0,
    category: "",
    stock: 0,
    images: [""],
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [vectorizationMessage, setVectorizationMessage] = useState("");
  const [vectorizationError, setVectorizationError] = useState("");

  const addProductMutation = useMutation({
    mutationFn: async (productData: ProductFormData) => {
      const response = await axiosClient.post(
        "/api/admin/products",
        productData
      );
      return response.data;
    },
    onSuccess: () => {
      setSuccessMessage("Product added successfully!");
      setErrorMessage("");
      setFormData({
        name: "",
        description: "",
        price: 0,
        category: "",
        stock: 0,
        images: [""],
      });
      // Invalidate products query to refresh the list
      queryClient.invalidateQueries({ queryKey: ["products"] });

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      setErrorMessage(error.response?.data?.message || "Failed to add product");
      setSuccessMessage("");
    },
  });

  const vectorizeMutation = useMutation({
    mutationFn: async () => {
      const response = await axiosClient.post("/api/product/vectorize");
      return response.data;
    },
    onSuccess: (data) => {
      const { processed, total, duration, errors } = data;
      let message = `Vectorization completed! Processed ${processed}/${total} products in ${(
        duration / 1000
      ).toFixed(2)}s.`;

      if (errors && errors.length > 0) {
        message += ` ${errors.length} errors occurred.`;
      }

      setVectorizationMessage(message);
      setVectorizationError("");

      // Clear message after 10 seconds
      setTimeout(() => setVectorizationMessage(""), 10000);
    },
    onError: (error: any) => {
      setVectorizationError(
        error.response?.data?.message || "Failed to vectorize products"
      );
      setVectorizationMessage("");

      // Clear error after 10 seconds
      setTimeout(() => setVectorizationError(""), 10000);
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "imageUrl") {
      setFormData((prev) => ({
        ...prev,
        images: [value],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]:
          name === "price" || name === "stock" ? parseFloat(value) || 0 : value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.name ||
      !formData.description ||
      !formData.category ||
      formData.price <= 0
    ) {
      setErrorMessage("Please fill in all required fields with valid values");
      return;
    }

    // Filter out empty image URLs
    const cleanedFormData = {
      ...formData,
      images: formData.images.filter((url) => url.trim() !== ""),
    };

    addProductMutation.mutate(cleanedFormData);
  };

  const handleVectorizeProducts = () => {
    vectorizeMutation.mutate();
  };

  return (
    <AdminContainer>
      <PageTitle>Admin Dashboard</PageTitle>

      <FormContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FormTitle>Add New Product</FormTitle>

        {successMessage && (
          <SuccessMessage
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {successMessage}
          </SuccessMessage>
        )}

        {errorMessage && (
          <ErrorMessage
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {errorMessage}
          </ErrorMessage>
        )}

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Product Name *</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter product name"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="description">Description *</Label>
            <TextArea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter product description"
              required
            />
          </FormGroup>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.5rem",
            }}
          >
            <FormGroup>
              <Label htmlFor="price">Price ($) *</Label>
              <Input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="stock">Stock Quantity</Label>
              <Input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                placeholder="0"
                min="0"
              />
            </FormGroup>
          </div>

          <FormGroup>
            <Label htmlFor="category">Category *</Label>
            <Select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a category</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="home">Home & Garden</option>
              <option value="books">Books</option>
              <option value="sports">Sports & Outdoors</option>
              <option value="beauty">Beauty & Health</option>
              <option value="toys">Toys & Games</option>
              <option value="automotive">Automotive</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.images[0] || ""}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
            />
          </FormGroup>

          <SubmitButton
            type="submit"
            disabled={addProductMutation.isPending}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {addProductMutation.isPending ? "Adding Product..." : "Add Product"}
          </SubmitButton>
        </Form>
      </FormContainer>

      <FormContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <FormTitle>Product Vectorization</FormTitle>

        {vectorizationMessage && (
          <SuccessMessage
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {vectorizationMessage}
          </SuccessMessage>
        )}

        {vectorizationError && (
          <ErrorMessage
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {vectorizationError}
          </ErrorMessage>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <p
            style={{ color: "#4a5568", fontSize: "0.9rem", lineHeight: "1.5" }}
          >
            Generate vector embeddings for all products to enable semantic
            search and recommendations. This process will analyze product names,
            descriptions, and categories to create searchable embeddings.
          </p>

          <SubmitButton
            type="button"
            onClick={handleVectorizeProducts}
            disabled={vectorizeMutation.isPending}
            whileHover={{ scale: vectorizeMutation.isPending ? 1 : 1.02 }}
            whileTap={{ scale: vectorizeMutation.isPending ? 1 : 0.98 }}
          >
            {vectorizeMutation.isPending
              ? "Vectorizing Products..."
              : "Vectorize All Products"}
          </SubmitButton>
        </div>
      </FormContainer>
    </AdminContainer>
  );
}
