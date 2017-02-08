package com.sojson.common.model;

import java.io.Serializable;

/**
 * 公告
 * @author chendf
 *
 */
public class Notice implements Serializable{
	private static final long serialVersionUID = 1L;
	private Long id;//公告id
	private String title;//标题
	private String content;// 内容
	private String publisher;//发布者
	private String publishTime;//发布时间
	private Long isPush;// 是否推送（0：是，1：否）
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getPublisher() {
		return publisher;
	}
	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}
	public String getPublishTime() {
		return publishTime;
	}
	public void setPublishTime(String publishTime) {
		this.publishTime = publishTime;
	}
	public Long getIsPush() {
		return isPush;
	}
	public void setIsPush(Long isPush) {
		this.isPush = isPush;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
}
