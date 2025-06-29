import React from "react";
import { Pagination as AntPagination } from "antd";
import styles from "./CustomPagination.module.scss";

interface CustomPaginationProps {
  current: number;
  pageSize: number;
  total: number;
  onChange: (page: number, pageSize?: number) => void;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showTotal?: (total: number, range: [number, number]) => string;
  pageSizeOptions?: string[];
  className?: string;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  current,
  pageSize,
  total,
  onChange,
  showSizeChanger = false,
  showQuickJumper = false,
  showTotal,
  pageSizeOptions = ["12", "24", "48", "96"],
  className,
}) => {
  return (
    <div className={`${styles.customPagination} ${className || ""}`}>
      <AntPagination
        current={current}
        pageSize={pageSize}
        total={total}
        onChange={onChange}
        showSizeChanger={showSizeChanger}
        showQuickJumper={showQuickJumper}
        showTotal={showTotal}
        pageSizeOptions={pageSizeOptions}
        className={styles.pagination}
      />
    </div>
  );
};

export default CustomPagination;
