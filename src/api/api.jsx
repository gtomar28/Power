import axios from "axios";

export const API_URL = "https://auth2.upicollect.com";

var bearerToken = `Token ${localStorage.getItem('power_token')}`

// My code 


export const CreateBank = async (requestData) => {
    axios.defaults.headers.common["Authorization"] = bearerToken;

    var response = await axios.post(`${API_URL}/api/banks/`, requestData);
    if (response) {
        return response;
    } else {
        return [];
    }
}



export const getAllAccounts = async () => {
    axios.defaults.headers.common["Authorization"] = bearerToken;
    var response = await axios.get(`${API_URL}/api/banks/`,);
    if (response) {
        return response;


    } else {
        return [];
    }
}

export const getAllSavedReports = async () => {
    axios.defaults.headers.common["Authorization"] = bearerToken;
    var response = await axios.get(`${API_URL}/api/reports/`,);
    if (response) {
        return response;


    } else {
        return [];
    }
}


export const deleteSavedReports = async (id) => {
    axios.defaults.headers.common["Authorization"] = bearerToken;
    var response = await axios.delete(`${API_URL}/api/reports/${id}/`,);
    if (response) {
        return response;


    } else {
        return [];
    }
}

export const getAllStatements = async () => {
    axios.defaults.headers.common["Authorization"] = bearerToken;
    var response = await axios.get(`${API_URL}/api/all-order/`,);
    if (response) {
        return response;
    } else {
        return [];
    }
}

export const getAllUsers = async (pageNo, searchTerm, role, status) => {
    axios.defaults.headers.common["Authorization"] = bearerToken;
    var response = await axios.get(`${API_URL}/api/users/getalluser/?page=${pageNo}&search=${searchTerm}&role=${role}&status=${status}`,);
    if (response) {
        return response;
    } else {
        return [];
    }
}

export const getAllUsersData = async (pageNo, searchTerm, role, status) => {
    axios.defaults.headers.common["Authorization"] = bearerToken;
    var response = await axios.get(`${API_URL}/api/users/dropdown-users/`);
    if (response) {
        return response;
    } else {
        return [];
    }
}

export const updateAgentsById = async (id, data) => {
    var response = await axios.patch(`${API_URL}/api/users/${id}/`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearerToken, // If needed
        },
    });
    if (response) {
        return response;
    } else {
        return [];
    }
}

export const generateReport = async (requestData) => {
    const response = await axios.post(`${API_URL}/api/reports/`, requestData, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearerToken, // If needed
        },
    })
    if (response) {
        return response;
    } else {
        return [];
    }
}

export const Loginuse = async (requestData) => {
    axios.defaults.headers.common["Authorization"] = "";

    var response = await axios.post(`${API_URL}/api/api-token-auth/`, requestData);
    if (response) {
        return response;
    } else {
        return [];
    }
}

export const LoginSuccess = async (requestData) => {
    axios.defaults.headers.common["Authorization"] = `Token ${requestData}`;
    var response = await axios.get(`${API_URL}/api/users/`,);
    if (response) {
        return response;
    } else {
        return [];
    }
}

export const userProfile = async () => {
    axios.defaults.headers.common["Authorization"] = bearerToken;
    var response = await axios.get(`${API_URL}/api/users/`,);
    if (response) {
        return response;
    } else {
        return [];
    }
}


export const createOrder = async (requestData, hmac) => {
    axios.defaults.headers.common["Authorization"] = bearerToken;
    axios.defaults.headers.common["Sign"] = hmac; // Include HMAC in headers
    const response = await axios.post(`${API_URL}/api/orders/`, requestData);
    return response;
};

export const createOrderForPayout = async (requestData, hmac) => {
    axios.defaults.headers.common["Authorization"] = bearerToken;
    axios.defaults.headers.common["Sign"] = hmac;
    var response = await axios.post(`${API_URL}/api/payout/create/`, requestData);
    if (response) {
        return response;
    } else {
        return [];
    }
}

export const getAllOrders = async (searchData, pageNo, day, agent) => {
    axios.defaults.headers.common["Authorization"] = bearerToken;
    var response = await axios.get(`${API_URL}/api/orders/?page=${pageNo}&search=${searchData}&date_filter=${day}&agent_id=${agent}`,);
    if (response) {
        return response;
    } else {
        return [];
    }
}

export const getOrdersForAgent = async (id) => {
    axios.defaults.headers.common["Authorization"] = bearerToken;
    var response = await axios.get(`${API_URL}/api/orders/agent/${id}/`,);
    if (response) {
        return response;
    } else {
        return [];
    }
}

export const getOrderById = async (id) => {
    axios.defaults.headers.common["Authorization"] = bearerToken;
    var response = await axios.get(`${API_URL}/api/orders/${id}/`,);
    if (response) {
        return response;
    } else {
        return [];
    }
}

export const getAllForAdmin = async (searchData, pageNo) => {
    axios.defaults.headers.common["Authorization"] = bearerToken;
    var response = await axios.get(`${API_URL}/api/orders/?page=${pageNo}&search=${searchData}`,);
    if (response) {
        return response;
    } else {
        return [];
    }
}


export const getAgents = async (pageNo, searchTerm, role, status) => {
    axios.defaults.headers.common["Authorization"] = bearerToken;
    var response = await axios.get(`${API_URL}/api/users/getalluser/?page=${pageNo}&search=${searchTerm}&role=${role}&status=${status}`,);
    if (response) {
        return response;
    } else {
        return [];
    }
}

export const getAgentsfor = async () => {
    axios.defaults.headers.common["Authorization"] = bearerToken;
    var response = await axios.get(`${API_URL}/api/users/online/`,);
    if (response) {
        return response;
    } else {
        return [];
    }
}

export const getCreatorAgents = async (pageNo) => {
    axios.defaults.headers.common["Authorization"] = bearerToken;
    var response = await axios.get(`${API_URL}/api/users/created-by/?page=${pageNo}`,);
    if (response) {
        return response;
    } else {
        return [];
    }
}

export const getAgentsById = async (id) => {
    axios.defaults.headers.common["Authorization"] = bearerToken;
    var response = await axios.get(`${API_URL}/api/users/${id}/`,);
    if (response) {
        return response;
    } else {
        return [];
    }
}

export const createFund = async (orderId, recId, id, amount) => {
    axios.defaults.headers.common["Authorization"] = "";
    var response = await axios.get(`${API_URL}/api/payments/create?order_id=${orderId}&receipt_id=${recId}&id=${id}&amount=${amount}`,);
    if (response) {
        return response;
    } else {
        return [];
    }
}


export const getDashboardStatistic = async (day, startDate, endDate) => {
    axios.defaults.headers.common["Authorization"] = bearerToken;
    var response = await axios.get(`${API_URL}/api/statistics/payin/?date_filter=${day}&start_date=${startDate}&end_date=${endDate}`,);
    if (response) {
        return response;
    } else {
        return [];
    }
}


export const Orderapproval = async (requestData, id, orderId) => {
    axios.defaults.headers.common["Authorization"] = bearerToken;
    var response = await axios.post(`${API_URL}/api/orders/agent/${id}/${orderId}/`, requestData);
    if (response) {
        return response;
    } else {
        return [];
    }
}


export const getAgentOrders = async (id) => {
    axios.defaults.headers.common["Authorization"] = bearerToken;
    var response = await axios.get(`${API_URL}/api/orders/agent/${id}`,);
    if (response) {
        return response;
    } else {
        return [];
    }
}


export const CreateUser = async (requestData) => {
    axios.defaults.headers.common["Authorization"] = bearerToken;

    var response = await axios.post(`${API_URL}/api/users/`, requestData);
    if (response) {
        return response;
    } else {
        return [];
    }
}

export const UpdatesUsers = async (requestData, id) => {
    axios.defaults.headers.common["Authorization"] = bearerToken;

    var response = await axios.patch(`${API_URL}/api/users/${id}`, requestData);
    if (response) {
        return response;
    } else {
        return [];
    }
}

export const CheckInAgent = async () => {
    axios.defaults.headers.common["Authorization"] = bearerToken;

    var response = await axios.post(`${API_URL}/api/agents/checkin/`,);
    if (response) {
        return response;
    } else {
        return [];
    }
}

export const CheckOutAgent = async () => {
    axios.defaults.headers.common["Authorization"] = bearerToken;

    var response = await axios.post(`${API_URL}/api/agents/checkout/`,);
    if (response) {
        return response;
    } else {
        return [];
    }
}

export const DownloadOrders = async (start_Date, end_date, id) => {
    axios.defaults.headers.common["Authorization"] = bearerToken;

    var response = await axios.get(`${API_URL}/api/orders/download-orders/?start_date=${start_Date}&end_date=${end_date}&type=PAYIN`,);
    if (response) {
        return response;
    } else {
        return [];
    }
}

export const DownloadUserList = async () => {
    axios.defaults.headers.common["Authorization"] = bearerToken;

    var response = await axios.get(`${API_URL}/api/users/download-csv`,);
    if (response) {
        return response;
    } else {
        return [];
    }
}


// Payout APIS 


export const getAllAayoutRequests = async (searchData, pageNo, agent, value) => {
    axios.defaults.headers.common["Authorization"] = bearerToken;

    var response = await axios.get(`${API_URL}/api/payouts/?page=${pageNo}&search=${searchData}&agent_id=${agent}&approval_status=${value}`,);
    if (response) {
        return response;
    } else {
        return [];
    }
}


export const onlineUser = async () => {
    axios.defaults.headers.common["Authorization"] = bearerToken;

    var response = await axios.get(`${API_URL}/api/users/checked_in/`,);
    if (response) {
        return response;
    } else {
        return [];
    }
}

export const assignOrder = async (data) => {
    axios.defaults.headers.common["Authorization"] = bearerToken;

    var response = await axios.post(`${API_URL}/api/payout/assign/`, data);
    if (response) {
        return response;
    } else {
        return [];
    }
}


export const getPerticualrProfile = async (id) => {
    axios.defaults.headers.common["Authorization"] = bearerToken;

    var response = await axios.get(`${API_URL}/api/users/${id}/`,);
    if (response) {
        return response;
    } else {
        return [];
    }
}

export const updateUserbyId = async (id) => {
    // axios.defaults.headers.common["Authorization"] = bearerToken;
    // var response = await axios.patch(`${API_URL}/api/users/${id}/`, data);
    const response = await axios.post(`${API_URL}/api/users/${id}/block-unblock/`, '', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearerToken, // If needed
        },
    })
    if (response) {
        return response;
    } else {
        return [];
    }
}

export const getDashStatics = async (id) => {
    axios.defaults.headers.common["Authorization"] = bearerToken;
    var response = await axios.get(`${API_URL}/api/statistics/`,);
    if (response) {
        return response;
    } else {
        return [];
    }
}

export const getGraphStatics = async (id) => {
    axios.defaults.headers.common["Authorization"] = bearerToken;
    var response = await axios.get(`${API_URL}/api/statistics/`,);
    if (response) {
        return response;
    } else {
        return [];
    }
}


export const perticularPayoutOrder = async (orderId) => {
    axios.defaults.headers.common["Authorization"] = bearerToken;

    var response = await axios.get(`${API_URL}/api/payouts/${orderId}/`,);
    if (response) {
        return response;
    } else {
        return [];
    }
}


export const approvePayout = async (id, data) => {
    const response = await axios.put(`${API_URL}/api/payout/update/${id}/`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearerToken, // If needed
        },
    })
    if (response) {
        return response;
    } else {
        return [];
    }
}

export const graphData = async (year, type) => {
    axios.defaults.headers.common["Authorization"] = bearerToken;

    var response = await axios.get(`${API_URL}/api/graph-statistics/?year=${year}&transaction_type=${type}`,);
    if (response) {
        return response;
    } else {
        return [];
    }
}


export const reportData = async () => {
    axios.defaults.headers.common["Authorization"] = bearerToken;

    var response = await axios.get(`${API_URL}/api/reports/`,);
    if (response) {
        return response;
    } else {
        return [];
    }
}

export const listOfPay = async () => {
    axios.defaults.headers.common["Authorization"] = bearerToken;

    var response = await axios.get(`${API_URL}/api/list/`,);
    if (response) {
        return response;
    } else {
        return [];
    }
}



export const generateRepot = async (requestData) => {
    const response = await axios.post(`${API_URL}/api/reports/`, requestData, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearerToken, // If needed
        },
    })
    if (response) {
        return response;
    } else {
        return [];
    }
}


export const Downloadreport = async (id) => {
    const response = await axios.get(`${API_URL}/api/reports/${id}/download/`, '', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearerToken, // If needed
        },
    })
    if (response) {
        return response;
    } else {
        return [];
    }
}


export const ShowReport = async (id) => {
    const response = await axios.get(`${API_URL}/api/reports/${id}/`, '', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearerToken, // If needed
        },
    })
    if (response) {
        return response;
    } else {
        return [];
    }
}



export const clientDetails = async () => {
    axios.defaults.headers.common["Authorization"] = bearerToken;

    var response = await axios.get(`${API_URL}/api/clients/`,);
    if (response) {
        return response;
    } else {
        return [];
    }
}


export const addNewClient = async (data) => {
    axios.defaults.headers.common["Authorization"] = bearerToken;

    var response = await axios.post(`${API_URL}/api/clients/`, data);
    if (response) {
        return response;
    } else {
        return [];
    }
}








