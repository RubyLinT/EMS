package com.sojson.common.model;

import java.io.Serializable;

public class UserNotice implements Serializable{
	
	private static final long serialVersionUID = 1L;
	private Long id;//id
	private Long userId;// 用户表Id
	private Long noticeId;// 公告表Id
	private Long isRead;//是否阅读（0：已阅读；1：未阅读）
	
	public Long getIsRead() {
		return isRead;
	}
	public void setIsRead(Long isRead) {
		this.isRead = isRead;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public Long getNoticeId() {
		return noticeId;
	}
	public void setNoticeId(Long noticeId) {
		this.noticeId = noticeId;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
}
