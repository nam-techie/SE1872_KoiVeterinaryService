import React from 'react';
import { Helmet } from 'react-helmet';

const PageTitle = ({ title, children }) => {
    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            {children}
        </>
    );
};

export default PageTitle;