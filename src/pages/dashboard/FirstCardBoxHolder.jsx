import React, { useState } from "react";
import { Grid } from "@mui/material";
import AmountCards from "components/cards/statistics/AmountCards";
import AnalyticEcommerce from "components/cards/statistics/AnalyticEcommerce";
import walletSettings from "assets/images/walletSettings.svg";
import AdminStats from "components/cards/statistics/AdminStats";
import AdminCount from "components/cards/statistics/AdminCount";

const FirstCardBoxHolder = ({ Statics, adminDetails }) => {
    const role = localStorage.getItem('role')
    // State for selected admin IDs
    const [selectedAdminIds, setSelectedAdminIds] = useState({});

    // Handler for admin selection
    const handleAdminSelect = (dropdownIndex, id) => {
        setSelectedAdminIds((prev) => ({ ...prev, [dropdownIndex]: id }));
        console.log(`Selected Admin in Dropdown ${dropdownIndex}:`, id); // Debug
    };

    return (
        <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={6} lg={6}>
                <AmountCards
                    title="PayIn Amount"
                    count={`${Statics?.total_payin_amount} INR`}
                    extra={`Available PayIn Limit: ${Statics?.payin_limit}`}
                    image={walletSettings}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
                <AmountCards
                    title="PayOut Amount"
                    count={`${Statics?.total_payout_amount} INR`}
                    extra={`Available PayIn Limit: ${Statics?.payout_limit}`}
                    image={walletSettings}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
                <AnalyticEcommerce
                    title="Total number of PayIn"
                    count={`${Statics?.total_payin_count}`}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
                <AnalyticEcommerce
                    title="Total number of PayOut"
                    count={`${Statics?.total_payout_count}`}
                />
            </Grid>

            {/* Dynamic Admin Dropdowns */}
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <AdminCount
                    title="Total"
                    items={adminDetails}
                    selectedAdminIds={selectedAdminIds}
                    onAdminSelect={handleAdminSelect}
                />
                
            </Grid>

            {/* Stats of Selected Admins */}
            {role === 'super admin' && 
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <AdminStats
                        title="Stats of"
                        items={adminDetails}
                        selectedAdminIds={Object.values(selectedAdminIds)}
                    />
                </Grid>
            }
        </Grid>
    );
};

export default FirstCardBoxHolder;


// import React, {useState} from 'react';
// import { Grid } from '@mui/material'
// import AmountCards from 'components/cards/statistics/AmountCards';
// import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

// import walletSettings from 'assets/images/walletSettings.svg';
// import AdminStats from 'components/cards/statistics/AdminStats';
// import AdminCount from 'components/cards/statistics/AdminCount';

// const FirstCardBoxHolder = ({ Statics, adminDetails }) => {

//     console.log(adminDetails, 'adminDetails')
//        // State for selected admin IDs
//        const [selectedFirstAdminId, setSelectedFirstAdminId] = useState(null);
//        const [selectedSecondAdminId, setSelectedSecondAdminId] = useState(null);

//     // Callbacks for handling selected IDs
//     const handleFirstAdminSelect = (id) => {
//         setSelectedFirstAdminId(id);
//         console.log('Selected First Admin ID:', id); // Debug
//     };

//     const handleSecondAdminSelect = (id) => {
//         setSelectedSecondAdminId(id);
//         console.log('Selected Second Admin ID:', id); // Debug
//     };

//     return (
//         <Grid container spacing={2} alignItems='center'>
//             <Grid item xs={12} sm={6} md={6} lg={6}>
//                 <AmountCards title="PayIn Amount" count={`${Statics?.total_payin_amount} INR`} extra={`Available PayIn Limit: ${Statics?.payin_limit}`} image={walletSettings} />
//             </Grid>
//             <Grid item xs={12} sm={6} md={6} lg={6}>
//                 <AmountCards title="PayOut Amount" count={`${Statics?.total_payout_amount} INR`} extra={`Available PayIn Limit: ${Statics?.payout_limit}`} image={walletSettings} />
//             </Grid>
//             <Grid item xs={12} sm={6} md={6} lg={6}>
//                 <AnalyticEcommerce title="Total number of PayIn" count={Statics?.total_payin_count} />
//             </Grid>
//             <Grid item xs={12} sm={6} md={6} lg={6}>
//                 <AnalyticEcommerce title="Total number of PayOut" count={Statics?.total_payout_count} />
//             </Grid>
//             <Grid item xs={12} sm={12} md={12} lg={12}>
//                 <AdminCount
//                     title="Total Admin"
//                     items={adminDetails}
//                     onSelectFirstAdmin={handleFirstAdminSelect}
//                     onSelectSecondAdmin={handleSecondAdminSelect}
//                 />
//             </Grid>
//             <Grid item xs={12} sm={12} md={12} lg={12}>
//                 <AdminStats title="Stats of Admins" items={adminDetails} firstId={selectedFirstAdminId} secId={selectedSecondAdminId} />
//             </Grid>
//         </Grid>
//     )
// }

// export default FirstCardBoxHolder




