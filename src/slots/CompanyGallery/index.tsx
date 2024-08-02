import React from 'react';
import { Row, Col } from 'antd';
import cx from 'classnames';

import styles from './index.module.less';

type Company = {
  name: string;
  img: string;
};

interface CompaniesProps {
  title: any;
  companyGallery: Company;
  className?: string;
  style?: React.CSSProperties;
}

export const CompanyGallery: React.FC<CompaniesProps> = ({
  title,
  companyGallery,
  className,
  style,
}) => {
  return (
    <div className={cx(styles.wrapper, className)} style={style}>
      <div key="content" className={styles.content}>
        <p key="title" className={styles.title}>
          {title}
        </p>
        <div key="companies-container" className={styles.companiesContainer}>
          <Row
            key="companies"
            gutter={[{ xs: 77, sm: 77, md: 50, lg: 124 }, 10]}
            wrap={true}
            className={styles.companies}
          >
            <Col key={companyGallery.name} className={styles.company} span={24}>
              <img
                src={companyGallery.img}
                alt={companyGallery.name}
                className={styles.companyimg}
              />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};
