'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Send, LogOut, Settings, RefreshCw, QrCode } from 'lucide-react';
import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_SERVER_URL || 'https://api.greenviewschool.in';

const toast = {
    success: (msg: string) => alert(msg),
    error: (msg: string) => alert(`Error: ${msg}`)
};

export default function WhatsAppSettings() {
    const [status, setStatus] = useState<any>({ connected: false, qrCode: null, user: null });
    const [loading, setLoading] = useState(true);
    const [testPhone, setTestPhone] = useState('');
    const [testMessage, setTestMessage] = useState('Hello from Green View ERP!');
    const [sending, setSending] = useState(false);
    
    // Automation settings
    const [automation, setAutomation] = useState({ isEnabled: false, startDay: 1, windowDays: 3 });
    const [savingSettings, setSavingSettings] = useState(false);

    const fetchStatus = async () => {
        try {
            const token = typeof window !== 'undefined' ? localStorage.getItem('erp_token') : '';
            const res = await axios.get(`${API_BASE}/api/erp/whatsapp/status`, { 
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true 
            });
            if (res.data.success) {
                setStatus(res.data.status);
            }
        } catch (error) {
            console.error('Failed to fetch WhatsApp status', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSettings = async () => {
        try {
            const token = typeof window !== 'undefined' ? localStorage.getItem('erp_token') : '';
            const res = await axios.get(`${API_BASE}/api/erp/whatsapp/automation-settings`, { 
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true 
            });
            if (res.data.success && res.data.settings) {
                setAutomation({
                    isEnabled: res.data.settings.isEnabled,
                    startDay: res.data.settings.startDay,
                    windowDays: res.data.settings.windowDays
                });
            }
        } catch (error) {
            console.error('Failed to fetch automation settings', error);
        }
    };

    useEffect(() => {
        fetchStatus();
        fetchSettings();
        
        // Poll status every 5 seconds if not connected to check for QR scan
        const interval = setInterval(() => {
            fetchStatus();
        }, 5000);
        
        return () => clearInterval(interval);
    }, []);

    const handleLogout = async () => {
        if (!confirm('Are you sure you want to disconnect WhatsApp? You will need to scan the QR code again.')) return;
        
        try {
            setLoading(true);
            const token = typeof window !== 'undefined' ? localStorage.getItem('erp_token') : '';
            const res = await axios.post(`${API_BASE}/api/erp/whatsapp/logout`, {}, { 
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true 
            });
            if (res.data.success) {
                toast.success('WhatsApp disconnected successfully');
                fetchStatus();
            }
        } catch (error: any) {
            toast.error(error.response?.data?.error || 'Failed to disconnect');
        } finally {
            setLoading(false);
        }
    };

    const handleSendTest = async () => {
        if (!testPhone || !testMessage) return;
        
        try {
            setSending(true);
            const token = typeof window !== 'undefined' ? localStorage.getItem('erp_token') : '';
            const res = await axios.post(`${API_BASE}/api/erp/whatsapp/send`, { number: testPhone, message: testMessage }, { 
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true 
            });
            if (res.data.success) {
                toast.success('Test message sent!');
            }
        } catch (error: any) {
            toast.error(error.response?.data?.error || 'Failed to send message');
        } finally {
            setSending(false);
        }
    };

    const handleSaveSettings = async () => {
        try {
            setSavingSettings(true);
            const token = typeof window !== 'undefined' ? localStorage.getItem('erp_token') : '';
            const res = await axios.post(`${API_BASE}/api/erp/whatsapp/automation-settings`, automation, { 
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true 
            });
            if (res.data.success) {
                toast.success('Automation settings saved');
            }
        } catch (error: any) {
            toast.error(error.response?.data?.error || 'Failed to save settings');
        } finally {
            setSavingSettings(false);
        }
    };

    const handleTriggerCron = async () => {
        if (!confirm('This will manually trigger the fee automation process. Messages will be sent in the background. Continue?')) return;
        
        try {
            const token = typeof window !== 'undefined' ? localStorage.getItem('erp_token') : '';
            const res = await axios.post(`${API_BASE}/api/erp/whatsapp/trigger-automation`, {}, { 
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true 
            });
            if (res.data.success) {
                toast.success('Fee automation triggered in background');
            }
        } catch (error: any) {
            toast.error(error.response?.data?.error || 'Failed to trigger automation');
        }
    };

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Send className="w-6 h-6 text-green-500" />
                        WhatsApp Integration
                    </h1>
                    <p className="text-gray-500">Manage WhatsApp connection and automated notifications</p>
                </div>
                <button 
                    onClick={fetchStatus}
                    className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors"
                    title="Refresh Status"
                >
                    <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Connection Status Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                >
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <QrCode className="w-5 h-5" />
                        Connection Status
                    </h2>

                    {loading && !status.qrCode ? (
                        <div className="flex items-center justify-center py-12">
                            <RefreshCw className="w-8 h-8 text-green-500 animate-spin" />
                        </div>
                    ) : status.connected ? (
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
                                <CheckCircle className="w-6 h-6" />
                                <div>
                                    <p className="font-medium">WhatsApp is Connected</p>
                                    <p className="text-sm opacity-80">Linked as: {status.user?.name || status.user?.id}</p>
                                </div>
                            </div>
                            
                            <button
                                onClick={handleLogout}
                                className="flex items-center justify-center gap-2 w-full px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                Disconnect
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {!status.qrCode && (
                                <div className="flex items-center gap-3 p-4 bg-amber-50 text-amber-700 rounded-lg border border-amber-200">
                                    <XCircle className="w-6 h-6" />
                                    <div>
                                        <p className="font-medium">WhatsApp is Disconnected</p>
                                        <p className="text-sm opacity-80">Please wait while the connection is established...</p>
                                    </div>
                                </div>
                            )}

                            {status.qrCode ? (
                                <div className="flex flex-col items-center justify-center py-4">
                                    <div className="p-4 bg-white border-2 border-gray-200 rounded-xl">
                                        <img src={status.qrCode} alt="WhatsApp QR Code" className="w-64 h-64" />
                                    </div>
                                    <p className="text-sm text-gray-500 mt-4 text-center">
                                        Open WhatsApp on your phone<br/>
                                        Tap Menu/Settings → Linked Devices → Link a Device
                                    </p>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                                    <RefreshCw className="w-8 h-8 animate-spin mb-4" />
                                    <p>Generating QR Code...</p>
                                    <p className="text-xs mt-2">Check backend console if this takes too long</p>
                                </div>
                            )}
                        </div>
                    )}
                </motion.div>

                <div className="space-y-6">
                    {/* Test Message Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${!status.connected && 'opacity-50 pointer-events-none'}`}
                    >
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Send className="w-5 h-5" />
                            Send Test Message
                        </h2>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input
                                    type="text"
                                    value={testPhone}
                                    onChange={(e) => setTestPhone(e.target.value)}
                                    placeholder="e.g. 9876543210"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                <textarea
                                    value={testMessage}
                                    onChange={(e) => setTestMessage(e.target.value)}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                />
                            </div>
                            <button
                                onClick={handleSendTest}
                                disabled={sending || !testPhone || !testMessage}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
                            >
                                {sending ? 'Sending...' : 'Send Message'}
                            </button>
                        </div>
                    </motion.div>

                    {/* Automation Settings Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                    >
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Settings className="w-5 h-5" />
                                Fee Automation
                            </div>
                            <button
                                onClick={handleTriggerCron}
                                className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-md transition-colors"
                            >
                                Run Now
                            </button>
                        </h2>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="font-medium text-gray-900">Enable Automation</label>
                                    <p className="text-sm text-gray-500">Send automated monthly fee reminders</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        className="sr-only peer"
                                        checked={automation.isEnabled}
                                        onChange={(e) => setAutomation({...automation, isEnabled: e.target.checked})}
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                                </label>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Day</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="28"
                                        value={automation.startDay}
                                        onChange={(e) => setAutomation({...automation, startDay: parseInt(e.target.value)})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Window (Days)</label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="15"
                                        value={automation.windowDays}
                                        onChange={(e) => setAutomation({...automation, windowDays: parseInt(e.target.value)})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                    />
                                </div>
                            </div>
                            
                            <p className="text-xs text-gray-500 mt-2">
                                Reminders will be distributed evenly over {automation.windowDays} days starting on the {automation.startDay}th of each month to avoid WhatsApp spam detection.
                            </p>

                            <button
                                onClick={handleSaveSettings}
                                disabled={savingSettings}
                                className="w-full bg-gray-900 hover:bg-black text-white font-medium py-2 px-4 rounded-lg transition-colors mt-2"
                            >
                                {savingSettings ? 'Saving...' : 'Save Settings'}
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
