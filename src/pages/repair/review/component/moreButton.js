import { useState, useEffect } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { remove } from "../../../../api";
import { BaseUrl } from "../../../../api/BaseUrl";

export const MoreButton = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleReport = () => {
    props.setReportInfo({
      reason: "",
      comment: "",
      commentId: props.commentId,
      shopId: props.shopId,
      ownerId: props.ownerId,
    });
    props.handleReportOpen();
    handleClose();
  };

  useEffect(() => {}, [props.replyInfo]);

  useEffect(() => {}, [props.comment]);

  const handleCommentUpdate = () => {
    props.handleUpdateCommentOpen();
    props.setReplyInfo({
      ...props.replyInfo,
      isUpdate: true,
      isComment: true,
      content: props.comment.reviewContent,
      rating: props.comment.rating,
      commentId: props.comment.reviewId,
    });
    handleClose();
  };

  const handleReplyUpdate = () => {
    props.handleUpdateReplyOpen();
    props.setReplyInfo({
      ...props.replyInfo,
      isUpdate: true,
      isComment: false,
      content: props.comment.replyContent,
      commentId: props.comment.replyId,
    });
    handleClose();
  };

  const handleCommentDelete = () => {
    handleClose();
    if (window.confirm(`댓글을 삭제하시겠습니까 ?`)) {
      remove(BaseUrl + "/api/repair/review/delete", {
        params: {
          reviewId: props.comment.reviewId,
        },
      })
        .then((res) => {
          if (res.data.success) {
            alert(res.data.msg);
            props.handleCommentDelete(props.comment.reviewId);
          } else {
            alert(res.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleReplyDelete = () => {
    handleClose();
    if (window.confirm(`답글을 삭제하시겠습니까 ?`)) {
      remove(BaseUrl + "/api/repair/reply/delete", {
        params: {
          replyId: props.comment.replyId,
        },
      })
        .then((res) => {
          if (res.data.success) {
            alert(res.data.msg);
            props.handleReplyDelete(props.comment.reviewId);
          } else {
            alert(res.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <IconButton
        aria-label="more"
        aria-controls="more-menu"
        aria-haspopup="true"
        onClick={handleMenuOpen}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {props.sessionId === props.ownerId && (
          <MenuItem
            onClick={props.isReply ? handleReplyUpdate : handleCommentUpdate}>
            수정
          </MenuItem>
        )}
        {props.sessionId === props.ownerId && (
          <MenuItem
            onClick={props.isReply ? handleReplyDelete : handleCommentDelete}>
            삭제
          </MenuItem>
        )}
        {props.sessionId !== props.ownerId && (
          <MenuItem onClick={handleReport}>신고</MenuItem>
        )}
      </Menu>
    </>
  );
};
