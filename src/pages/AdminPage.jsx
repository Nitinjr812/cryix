import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Users, 
  DollarSign, 
  Mail, 
  User, 
  RefreshCw, 
  Bell, 
  LogOut, 
  Pencil, 
  Trash2, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle, 
  XCircle,
  Clock
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [adminInfo, setAdminInfo] = useState({ username: 'Admin' });
  const [sortConfig, setSortConfig] = useState({ key: 'username', direction: 'ascending' });
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditingBalance, setIsEditingBalance] = useState(false);
  const [newBalance, setNewBalance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    // Get admin info from localStorage
    const storedAdminInfo = localStorage.getItem('adminInfo');
    if (storedAdminInfo) {
      try {
        setAdminInfo(JSON.parse(storedAdminInfo));
      } catch (e) {
        console.error('Error parsing admin info:', e);
      }
    }

    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setRefreshing(true);
    try {
      // Get admin token
      const adminToken = localStorage.getItem('adminToken');
      
      if (!adminToken) {
        navigate('/admin/login');
        return;
      }

      // Try to fetch with the admin token first
      try {
        const response = await axios.get('https://cryix-backend.vercel.app/admin/users', {
          headers: {
            Authorization: `Bearer ${adminToken}`
          }
        });

        if (response.data.success) {
          console.log('API Response:', response.data);
          setUsers(response.data.users || []);
          toast.success('Users loaded successfully');
        } else {
          console.warn('Admin API returned unsuccessful response, falling back to public endpoint');
          fallbackToPublicAPI();
        }
      } catch (error) {
        // If admin API fails, fall back to the public endpoint
        console.warn('Admin API failed, falling back to public endpoint:', error);
        fallbackToPublicAPI();
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Error connecting to server');
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fallbackToPublicAPI = async () => {
    try {
      // Fall back to the public endpoint
      const response = await axios.get('https://cryix-backend.vercel.app/allusers');
      
      if (response.data.success) {
        console.log('Public API Response:', response.data);
        setUsers(response.data.users || []);
        toast.info('Using public user data (limited access)');
      } else {
        setError('Failed to fetch users data');
        toast.error('Failed to load users data');
      }
    } catch (err) {
      console.error('Error fetching users from public API:', err);
      setError('Error connecting to server');
      toast.error('Failed to load users data');
    }
  };

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate stats
  const totalUsers = users.length;
  const totalBalance = users.reduce((sum, user) => sum + (user.balance || 0), 0);
  const totalReferrals = users.reduce((sum, user) => sum + (user.referrals?.length || 0), 0);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
    toast.success('Admin logged out successfully');
    navigate('/admin/login');
  };

  // Handle sorting
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortedUsers = () => {
    const sortableUsers = [...filteredUsers];
    if (sortConfig.key) {
      sortableUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableUsers;
  };

  // Handle user selection
  const handleUserSelect = (user) => {
    if (selectedUser && selectedUser._id === user._id) {
      setSelectedUser(null);
    } else {
      setSelectedUser(user);
      setNewBalance(user.balance);
    }
  };

  // Update user balance
  const updateBalance = async () => {
    if (!selectedUser) return;
    
    try {
      // Get admin token
      const adminToken = localStorage.getItem('adminToken');
      
      if (!adminToken) {
        toast.error('Admin authentication required');
        navigate('/admin/login');
        return;
      }
      
      const response = await axios.patch(
        `https://cryix-backend.vercel.app/admin/users/${selectedUser._id}/balance`, 
        { balance: parseFloat(newBalance) },
        {
          headers: {
            Authorization: `Bearer ${adminToken}`
          }
        }
      );
      
      if (response.data.success) {
        // Update local state
        const updatedUsers = users.map(user => {
          if (user._id === selectedUser._id) {
            return { ...user, balance: parseFloat(newBalance) };
          }
          return user;
        });
        
        setUsers(updatedUsers);
        setIsEditingBalance(false);
        toast.success(`Balance updated for ${selectedUser.username}`);
      } else {
        toast.error('Failed to update balance: ' + (response.data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error updating balance:', error);
      toast.error(`Failed to update balance: ${error.response?.data?.message || error.message}`);
    }
  };

  // Delete user
  const deleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }
    
    try {
      // Get admin token
      const adminToken = localStorage.getItem('adminToken');
      
      if (!adminToken) {
        toast.error('Admin authentication required');
        navigate('/admin/login');
        return;
      }
      
      const response = await axios.delete(
        `https://cryix-backend.vercel.app/admin/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${adminToken}`
          }
        }
      );
      
      if (response.data.success) {
        // Update local state
        const updatedUsers = users.filter(user => user._id !== userId);
        setUsers(updatedUsers);
        
        if (selectedUser && selectedUser._id === userId) {
          setSelectedUser(null);
        }
        
        toast.success('User deleted successfully');
      } else {
        toast.error('Failed to delete user: ' + (response.data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error(`Failed to delete user: ${error.response?.data?.message || error.message}`);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Check if mining is available
  const isMiningAvailable = (nextMineTime) => {
    if (!nextMineTime) return true;
    return new Date() > new Date(nextMineTime);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="p-2 bg-indigo-600 rounded text-white mr-3">
                <Users size={24} />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Cryix Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                className="bg-indigo-100 text-indigo-700 p-2 rounded-full hover:bg-indigo-200 flex items-center gap-2 px-4"
                onClick={fetchUsers}
                disabled={refreshing}
              >
                <RefreshCw size={16} className={`${refreshing ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
              <button 
                className="p-2 rounded-full hover:bg-gray-100"
                onClick={handleLogout}
                title="Logout"
              >
                <LogOut size={20} />
              </button>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                  {adminInfo.username ? adminInfo.username.charAt(0).toUpperCase() : 'A'}
                </div>
                <span className="ml-2 font-medium">{adminInfo.username || 'Admin'}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <Users size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
                <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <DollarSign size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm font-medium">Total Balance</h3>
                <p className="text-2xl font-bold text-gray-900">${totalBalance.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <User size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-gray-500 text-sm font-medium">Total Referrals</h3>
                <p className="text-2xl font-bold text-gray-900">{totalReferrals}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table Section */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <h2 className="text-lg font-medium text-gray-900 mb-3 md:mb-0">User Management</h2>
              <div className="flex items-center w-full md:w-auto">
                <div className="relative w-full md:w-64">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center p-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <p className="text-red-500">{error}</p>
              <button 
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={fetchUsers}
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('username')}>
                      <div className="flex items-center">
                        Username
                        {sortConfig.key === 'username' && (
                          sortConfig.direction === 'ascending' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                        )}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('email')}>
                      <div className="flex items-center">
                        Email
                        {sortConfig.key === 'email' && (
                          sortConfig.direction === 'ascending' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                        )}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('balance')}>
                      <div className="flex items-center">
                        Balance
                        {sortConfig.key === 'balance' && (
                          sortConfig.direction === 'ascending' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                        )}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Referrals
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mining Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => requestSort('createdAt')}>
                      <div className="flex items-center">
                        Joined
                        {sortConfig.key === 'createdAt' && (
                          sortConfig.direction === 'ascending' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                        )}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {getSortedUsers().map(user => (
                    <React.Fragment key={user._id}>
                      <tr 
                        className={`hover:bg-gray-50 ${selectedUser && selectedUser._id === user._id ? 'bg-indigo-50' : ''}`}
                        onClick={() => handleUserSelect(user)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{user.username}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-500">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-900 font-medium">${user.balance?.toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <User size={16} className="text-gray-400 mr-1" />
                            <span className="text-gray-900">{user.referrals?.length || 0}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.nextMineTime ? (
                            <div className="flex items-center">
                              {isMiningAvailable(user.nextMineTime) ? (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  <CheckCircle size={14} className="mr-1" /> Available
                                </span>
                              ) : (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                  <Clock size={14} className="mr-1" /> On Cooldown
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-gray-500">Unknown</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {formatDate(user.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button 
                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedUser(user);
                              setNewBalance(user.balance);
                              setIsEditingBalance(true);
                            }}
                          >
                            <Pencil size={16} />
                          </button>
                          <button 
                            className="text-red-600 hover:text-red-900"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteUser(user._id);
                            }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                      {selectedUser && selectedUser._id === user._id && (
                        <tr className="bg-indigo-50">
                          <td colSpan="7" className="px-6 py-4">
                            <div className="flex flex-col md:flex-row gap-6">
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900 mb-2">User Details</h4>
                                <div className="grid grid-cols-2 gap-y-2">
                                  <span className="text-gray-500">User ID:</span>
                                  <span className="text-gray-900">{user._id}</span>
                                  <span className="text-gray-500">Username:</span>
                                  <span className="text-gray-900">{user.username}</span>
                                  <span className="text-gray-500">Email:</span>
                                  <span className="text-gray-900">{user.email}</span>
                                  <span className="text-gray-500">Balance:</span>
                                  <span className="text-gray-900">${user.balance?.toFixed(2)}</span>
                                  <span className="text-gray-500">Mining Bonus:</span>
                                  <span className="text-gray-900">{user.miningBonus ? `${user.miningBonus} coins` : 'None'}</span>
                                  <span className="text-gray-500">Joined:</span>
                                  <span className="text-gray-900">{formatDate(user.createdAt)}</span>
                                </div>
                              </div>
                              
                              <div className="flex-1">
                                {isEditingBalance ? (
                                  <div>
                                    <h4 className="font-medium text-gray-900 mb-2">Edit Balance</h4>
                                    <div className="flex items-center gap-2">
                                      <div className="relative rounded-md shadow-sm flex-1">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                          <span className="text-gray-500 sm:text-sm">$</span>
                                        </div>
                                        <input
                                          type="number"
                                          step="0.01"
                                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                          placeholder="0.00"
                                          value={newBalance}
                                          onChange={(e) => setNewBalance(e.target.value)}
                                        />
                                      </div>
                                      <button
                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        onClick={updateBalance}
                                      >
                                        Update
                                      </button>
                                      <button
                                        className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        onClick={() => setIsEditingBalance(false)}
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <div>
                                    <h4 className="font-medium text-gray-900 mb-2">Actions</h4>
                                    <div className="flex flex-wrap gap-2">
                                      <button
                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        onClick={() => setIsEditingBalance(true)}
                                      >
                                        <Pencil size={16} className="mr-1" />
                                        Edit Balance
                                      </button>
                                      <button
                                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                        onClick={() => deleteUser(user._id)}
                                      >
                                        <Trash2 size={16} className="mr-1" />
                                        Delete User
                                      </button>
                                    </div>
                                  </div>
                                )}
                                
                                {user.nextMineTime && (
                                  <div className="mt-4">
                                    <h4 className="font-medium text-gray-900 mb-2">Mining Status</h4>
                                    {isMiningAvailable(user.nextMineTime) ? (
                                      <div className="flex items-center text-green-600">
                                        <CheckCircle size={16} className="mr-1" />
                                        <span>Mining is available</span>
                                      </div>
                                    ) : (
                                      <div>
                                        <div className="flex items-center text-gray-600">
                                          <Clock size={16} className="mr-1" />
                                          <span>Next mining available at:</span>
                                        </div>
                                        <div className="text-gray-900 font-medium">
                                          {new Date(user.nextMineTime).toLocaleString()}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                  
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan="7" className="px-6 py-10 text-center text-gray-500">
                        {searchTerm ? 'No users match your search' : 'No users found'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium text-gray-900">{filteredUsers.length}</span> of <span className="font-medium text-gray-900">{users.length}</span> users
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 text-center">© 2023 Cryix Admin Panel. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AdminPage;