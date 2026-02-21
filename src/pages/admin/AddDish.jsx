import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Upload, CheckCircle, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { adminAPI } from '../../services/api';

const AddDish = () => {
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        category: '',
        price: '',
        description: ''
    });
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('type', formData.type);
            formDataToSend.append('category', formData.category);
            formDataToSend.append('price', formData.price);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('image', image);

            const response = await adminAPI.addDish(formDataToSend);

            if (response.data.success) {
                setMessage({ type: 'success', text: 'Dish added successfully!' });
                // Reset form
                setFormData({
                    name: '',
                    type: '',
                    category: '',
                    price: '',
                    description: ''
                });
                setImage(null);
                setImagePreview(null);
            } else {
                setMessage({
                    type: 'error',
                    text: response.data.message || 'Failed to add dish. Please try again.'
                });
            }
        } catch (error) {
            setMessage({
                type: 'error',
                text: error.response?.data?.message || 'Failed to connect to server.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Dish</h1>
                    <p className="text-gray-600">Create a new dish for your menu</p>
                </div>

                {/* Message Alert */}
                {message.text && (
                    <div className={`mb-6 p-4 rounded-xl flex items-start gap-3 ${message.type === 'success'
                        ? 'bg-green-50 border-l-4 border-green-500'
                        : 'bg-red-50 border-l-4 border-red-500'
                        }`}>
                        {message.type === 'success' ? (
                            <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                        ) : (
                            <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                        )}
                        <p className={`text-sm font-medium ${message.type === 'success' ? 'text-green-700' : 'text-red-700'
                            }`}>
                            {message.text}
                        </p>
                    </div>
                )}

                {/* Form */}
                <div className="bg-white rounded-2xl shadow-premium p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Dish Image
                            </label>
                            <div className="flex items-start gap-6">
                                {/* Preview */}
                                <div className="flex-shrink-0">
                                    <div className="w-32 h-32 rounded-xl border-2 border-dashed border-gray-300 overflow-hidden bg-gray-50 flex items-center justify-center">
                                        {imagePreview ? (
                                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <ImageIcon className="text-gray-400" size={40} />
                                        )}
                                    </div>
                                </div>

                                {/* Upload Button */}
                                <div className="flex-1">
                                    <label className="cursor-pointer">
                                        <div className="border-2 border-dashed border-primary-300 rounded-xl p-6 hover:border-primary-500 hover:bg-primary-50 transition-all">
                                            <div className="flex flex-col items-center gap-2">
                                                <Upload className="text-primary-600" size={32} />
                                                <p className="text-sm font-semibold text-gray-700">
                                                    Click to upload image
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    PNG, JPG up to 5MB
                                                </p>
                                            </div>
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                            required
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Dish Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                Dish Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none"
                                placeholder="e.g., Butter Chicken"
                                required
                            />
                        </div>

                        {/* Type and Category */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Type
                                </label>
                                <select
                                    id="type"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none"
                                    required
                                >
                                    <option value="">Select Type</option>
                                    <option value="Veg">Veg Dish</option>
                                    <option value="Non-Veg">Non-Veg Dish</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Category
                                </label>
                                <input
                                    type="text"
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none"
                                    placeholder="e.g., Main Course"
                                    required
                                />
                            </div>
                        </div>

                        {/* Price */}
                        <div>
                            <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
                                Price (₹)
                            </label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none"
                                placeholder="299"
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none resize-none"
                                placeholder="Describe the dish..."
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Adding Dish...' : 'Add Dish to Menu'}
                        </button>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AddDish;
