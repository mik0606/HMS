// pharmacy.tsx

import React from 'react';
// Neenga unga project-oda Shadcn components-a use panna vendum:
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// Lucide icons
import { Plus, Edit, Trash2, Search, RotateCw, Factory, Package, BarChart2 } from 'lucide-react';

// --- Dummy Data Definitions (Based on all 3 Screenshots) ---

// 1. Inventory Data (Medicine Inventory Tab)
const mockInventoryData = [
    { name: "Paracetamol 500mg", sku: "MED-001", category: "Analgesic", manufacturer: "ABC Pharma", stock: 300, status: "In Stock" },
    { name: "Amoxicillin 250mg", sku: "MED-002", category: "Antibiotic", manufacturer: "XYZ Labs", stock: 314, status: "In Stock" },
    { name: "Insulin 100IU", sku: "MED-003", category: "Diabetes", manufacturer: "MediCare", stock: 0, status: "Out" },
    { name: "Aspirin 75mg", sku: "MED-004", category: "Antiplatelet", manufacturer: "HealthPharma", stock: 200, status: "In Stock" },
];

// 2. Batch Data (Batches Tab)
const mockBatchData = [
    { batchNo: "BATCH-SEED-001", medName: "Paracetamol 500mg", supplier: "Sample Supplier", quantity: 300, salePrice: 10.00, costPrice: 5.00, expiry: "31/12/2026" },
    { batchNo: "BATCH-SEED-002", medName: "Amoxicillin 250mg", supplier: "Sample Supplier", quantity: 14, salePrice: 10.00, costPrice: 5.00, expiry: "31/12/2026" },
    { batchNo: "DEFAULT", medName: "gudna", supplier: "-", quantity: 200, salePrice: 1500.00, costPrice: 1000.00, expiry: "N/A" },
];

// 3. Analytics Data (Analytics Tab)
const mockAnalyticsData = {
    totalMedicines: 100,
    lowStock: 3,
    outOfStock: 2
};

const PharmacyPage: React.FC = () => {
    const primaryColor = "bg-blue-600 hover:bg-blue-700";

    return (
        <div className="p-8">




            {/* Main Tabs Container */}
            <Tabs defaultValue="inventory">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="inventory">Medicine Inventory</TabsTrigger>
                    <TabsTrigger value="batches">Batches</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                {/* ---------------------------------------------------- */}
                {/* 1. MEDICINE INVENTORY TAB CONTENT (image_c9e362.png) */}
                {/* ---------------------------------------------------- */}
                <TabsContent value="inventory" className="mt-4">

                    {/* Search and Filter Row */}
                    <div className="flex mb-4 space-x-4 items-center">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search medicines by name, SKU, or category..."
                                className="pl-10 p-3 border border-gray-300 rounded-lg w-full shadow-sm"
                            />
                        </div>

                        {/* Filter (All) */}
                        <Select>
                            <SelectTrigger className="w-[180px] p-3 border rounded-lg shadow-sm">
                                <SelectValue placeholder="All Categories" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="analgesic">Analgesic</SelectItem>
                                {/* Add other categories here */}
                            </SelectContent>
                        </Select>

                        {/* Refresh Button */}
                        <Button variant="outline" size="icon" className="h-11 w-11">
                            <RotateCw className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Medicine Inventory Table */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden border">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medicine Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manufacturer</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {mockInventoryData.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.sku}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.manufacturer}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold" style={{ color: item.stock === 0 ? '#ef4444' : '#10b981' }}>
                                            {item.stock}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-xs">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.status === 'In Stock' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-blue-600">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-red-600">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Pagination Row */}
                        <div className="px-6 py-3 flex justify-between items-center text-sm text-gray-600 border-t">
                            <span>Showing 1-20 of 100 medicines</span>
                            {/* Simple pagination place holder */}
                            <span>Page 1 of 5</span>
                        </div>
                    </div>
                </TabsContent>

                {/* ---------------------------------------------------- */}
                {/* 2. BATCHES TAB CONTENT (Screenshot 2025-12-12 155617.png) */}
                {/* ---------------------------------------------------- */}
                <TabsContent value="batches" className="mt-4">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                                <Package className="h-6 w-6 text-blue-600" /> Batch Management
                            </h2>
                            <Button className={`${primaryColor} text-white font-medium gap-2`}>
                                <Plus className="h-4 w-4" /> Add Batch
                            </Button>
                        </div>

                        {/* Batch Table structure */}
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden border">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch Number</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medicine Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sale Price</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost Price</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {mockBatchData.map((item, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.batchNo}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.medName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.supplier}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">{item.quantity}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">₹{item.salePrice.toFixed(2)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{item.costPrice.toFixed(2)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.expiry}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-blue-600">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-red-600">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </TabsContent>

                {/* ---------------------------------------------------- */}
                {/* 3. ANALYTICS TAB CONTENT (Screenshot 2025-12-12 155634.png) */}
                {/* ---------------------------------------------------- */}
                <TabsContent value="analytics" className="mt-4">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                            <BarChart2 className="h-6 w-6 text-blue-600" /> Inventory Analytics
                        </h2>

                        {/* Analytics Cards Row */}
                        <div className="grid grid-cols-3 gap-6">
                            {/* 1. Total Medicines Card */}
                            <Card className="shadow-lg border-t-4 border-blue-600">
                                <CardContent className="pt-6 text-center space-y-2">
                                    <Factory className="h-8 w-8 text-blue-600 mx-auto" />
                                    <div className="text-5xl font-bold text-gray-900">{mockAnalyticsData.totalMedicines}</div>
                                    <p className="text-gray-500 font-medium">Total Medicines</p>
                                </CardContent>
                            </Card>

                            {/* 2. Low Stock Card */}
                            <Card className="shadow-lg border-t-4 border-yellow-500">
                                <CardContent className="pt-6 text-center space-y-2">
                                    <Package className="h-8 w-8 text-yellow-500 mx-auto" />
                                    <div className="text-5xl font-bold text-gray-900">{mockAnalyticsData.lowStock}</div>
                                    <p className="text-gray-500 font-medium">Low Stock</p>
                                </CardContent>
                            </Card>

                            {/* 3. Out of Stock Card */}
                            <Card className="shadow-lg border-t-4 border-red-500">
                                <CardContent className="pt-6 text-center space-y-2">
                                    <Package className="h-8 w-8 text-red-500 mx-auto" />
                                    <div className="text-5xl font-bold text-gray-900">{mockAnalyticsData.outOfStock}</div>
                                    <p className="text-gray-500 font-medium">Out of Stock</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default PharmacyPage;