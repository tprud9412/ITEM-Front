import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  Button,
} from "@mui/material";
import { categorys, brands, products } from "../constant";
import { useState } from "react";
import DeviceMenuItem from "../register/DeviceMenuItem";

const DeviceUpdate = ({ updateOpen, updateCloseHandle, deviceUpdate }) => {
  const [deviceInfo, setDeviceInfo] = useState({
    brand: 0,
    category: 0,
    product: 0,
  });

  const { brand, category, product } = deviceInfo;

  const brandData = {
    selectName: "brand",
    selectValue: brand,
    dataList: [{ id: 0, name: "브랜드명" }, ...brands],
  };

  const categoryData = {
    selectName: "category",
    selectValue: category,
    dataList: [{ id: 0, name: "카테고리명" }, ...categorys],
  };

  const productData = {
    selectName: "product",
    selectValue: product,
    dataList: [{ id: 0, name: "제품명" }, ...products],
  };

  const onChangeDeviceInfo = (e) => {
    const { name, value } = e.target;
    setDeviceInfo({
      ...deviceInfo,
      [name]: value,
    });
  };

  return (
    <>
      <Dialog open={updateOpen} onClose={updateCloseHandle}>
        <DialogTitle>기기 수정</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <DialogContentText>
                수정할 기기의 브랜드, 카테고리, 제품명을 선택해주세요
              </DialogContentText>
            </Grid>
            <Grid item xs={12}>
              <DialogContentText>카테고리명</DialogContentText>
              <DeviceMenuItem
                dataList={categoryData}
                deviceInfo={deviceInfo}
                onChangeDeviceInfo={onChangeDeviceInfo}
              />
            </Grid>
            <Grid item xs={12}>
              <DialogContentText>브랜드명</DialogContentText>
              <DeviceMenuItem
                dataList={brandData}
                deviceInfo={deviceInfo}
                onChangeDeviceInfo={onChangeDeviceInfo}
              />
            </Grid>
            <Grid item xs={12}>
              <DialogContentText>제품명</DialogContentText>
              <DeviceMenuItem
                dataList={productData}
                deviceInfo={deviceInfo}
                onChangeDeviceInfo={onChangeDeviceInfo}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ mb: 2, mr: 2 }}>
          <Button variant="contained" onClick={updateCloseHandle}>
            취소
          </Button>
          <Button variant="contained" onClick={deviceUpdate}>
            수정
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default DeviceUpdate;
