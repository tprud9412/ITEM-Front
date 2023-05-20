import { useState } from "react";
import { reservationHistoryForUser } from "../data/test";
import { TitleButtonBar } from "../../../component/titleButtonBar";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "react-modal";

export const ReservationHistoryDetail = ({ role }) => {
  const tmp = reservationHistoryForUser[0];
  const [data, setData] = useState(tmp);
  const location = useLocation();
  const navigate = useNavigate();

  const [imgViewModalState, setImgViewModalState] = useState(false);
  const [imgViewModalImgState, setImgViewModalImgState] = useState("");

  console.log(data);

  const modalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "90%",
    },
  };
  const modalImgStyles = {
    maxWidth: "100%",
    objectFit: "cover",
    width: "100%",
  };
  return (
    <>
      <Modal isOpen={imgViewModalState} style={modalStyles} ariaHideApp={false}>
        <img
          src={imgViewModalImgState}
          onClick={() => setImgViewModalState(false)}
          style={modalImgStyles}
          alt="requsetImg"
        />
      </Modal>
      <TitleButtonBar title="예약 내역" />
      <Container
        sx={{
          mt: "56px",
          pt: "1%",
        }}
      >
        <Box
          sx={{
            position: "relative",
            display: "flex",
            width: "100%",
            height: "100px",
            border: "1px solid #C4C4C4",
            borderRadius: "4px",
            mt: "3%",
            padding: "3%",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              position: "absolute",
              top: -10,
              left: 10,
              bgcolor: "white",
              px: 1,
              fontSize: "0.8rem",
            }}
          >
            제품정보
          </Typography>
          {data.prodImg ? (
            <Box
              component="img"
              src={data.prodImg}
              alt={data.productName}
              sx={{
                width: "40%",
                height: "100%",
                mr: "5%",
                borderRadius: "10px",
              }}
            />
          ) : (
            <Box
              sx={{
                width: "40%",
                height: "100%",
                mr: "5%",
                bgcolor: "#8C92AC",
                borderRadius: "10px",
              }}
            ></Box>
          )}
          <Typography>{data.productName}</Typography>
        </Box>
        <Box
          sx={{
            position: "relative",
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
            minHeight: "100px",
            border: "1px solid #C4C4C4",
            borderRadius: "4px",
            mt: "3%",
            padding: "3%",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              position: "absolute",
              top: -10,
              left: 10,
              bgcolor: "white",
              px: 1,
              fontSize: "0.8rem",
            }}
          >
            신청정보
          </Typography>
          <Grid
            container
            direction="column"
            alignContent={"flex-start"}
            sx={{
              borderBottom: "1px dashed #C4C4C4",
              mb: "3%",
              pb: "3%",
            }}
          >
            {data.requestServices.map((item, index) => {
              return (
                <Grid
                  item
                  key={index}
                  sx={{
                    backgroundColor: "#D3D3D3",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "1%",
                    borderRadius: "10px",
                    mb: "2%",
                  }}
                >
                  <SettingsIcon sx={{ fontSize: "40px" }} />
                  <Typography variant="h5" fontWeight="bold">
                    {item}
                  </Typography>
                </Grid>
              );
            })}
          </Grid>

          <Typography
            variant="body1"
            sx={{
              width: "100%",
              flex: "1 0 auto",
              mt: "1%",
              borderBottom: "1px dashed #A4A4A4",
              mb: "3%",
              pb: "3%",
            }}
          >
            <div className="reservation_img_field">
              <div className="img_common_field">
                {data.rvRequestImgs.map((img, index) => (
                  <div className="img_common_div" key={index}>
                    <img
                      className="img_content"
                      src={img}
                      alt="rvImgs"
                      onClick={() => {
                        setImgViewModalState(true);
                        setImgViewModalImgState(img);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Typography>

          <Typography
            variant="body1"
            sx={{
              width: "100%",
              flex: "1 0 auto",
              mt: "1%",
              borderBottom: "1px dashed #A4A4A4",
              mb: "3%",
              pb: "3%",
            }}
          >
            {data.requestComment}
          </Typography>
          <Typography
            variant="h6"
            sx={{ width: "100%", flex: "1 0 auto", mt: "1%" }}
          >
            예약 시간 : {data.date} {data.time}
          </Typography>
        </Box>
        {location.state?.role === "repair"
          ? console.log("repair")
          : console.log("fail")}
        {location.state?.role === "repair" ? (
          <Box
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "space-around",
              width: "100%",
              height: "100px",
              border: "1px solid #C4C4C4",
              borderRadius: "4px",
              mt: "3%",
              padding: "3%",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                position: "absolute",
                top: -10,
                left: 10,
                bgcolor: "white",
                px: 1,
                fontSize: "0.8rem",
              }}
            >
              예약 처리
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                console.log(data.id + " 번 예약" + " 거절");
                navigate(-1);
              }}
              sx={{
                width: "40%",
                height: "80%",
              }}
            >
              거절
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                console.log(data.id + " 번 예약" + " 수락");
                navigate(-1);
              }}
              sx={{ width: "40%", height: "80%" }}
            >
              수락
            </Button>
          </Box>
        ) : null}
      </Container>
    </>
  );
};
