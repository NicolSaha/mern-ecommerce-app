import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Welcome to Wild Extracts Webshop',
  description: 'We sell organic essential oils, sourced sustainabily in Nepal!',
  keywords: 'essential oils, organic, Nepal',
};

export default Meta;
