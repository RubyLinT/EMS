package com.sojson.common.model;

import java.io.Serializable;
import java.util.Date;

public class CustomerTrack implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String customId; //客户ID
	private String ascription; //跟踪人，即记录此条记录的业务员账号
	private Date recordTime; //记录时间
	private Long contactId; //联系人ID
	private String trackContent; //跟进内容，富文本，可文字和图片
	private String	trackFile; //附件地址，要求相对路径，不可用c:d：之类的绝对路径
	private String nextTrackDate; //预计下次跟进时间
	private String nextComtent; //预计跟进内容，纯文本
	private Long  reminderDate; //提前几天提醒，可不选，选择了就录入提醒表
	private String createStartTime;//跟进起始时间
	private String createEndTime;//跟进结束时间
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getCustomId() {
		return customId;
	}
	public void setCustomId(String customId) {
		this.customId = customId;
	}
	public String getAscription() {
		return ascription;
	}
	public void setAscription(String ascription) {
		this.ascription = ascription;
	}
	public Date getRecordTime() {
		return recordTime;
	}
	public void setRecordTime(Date recordTime) {
		this.recordTime = recordTime;
	}
	public Long getContactId() {
		return contactId;
	}
	public void setContactId(Long contactId) {
		this.contactId = contactId;
	}
	public String getTrackContent() {
		return trackContent;
	}
	public void setTrackContent(String trackContent) {
		this.trackContent = trackContent;
	}
	public String getTrackFile() {
		return trackFile;
	}
	public void setTrackFile(String trackFile) {
		this.trackFile = trackFile;
	}
	public String getNextTrackDate() {
		return nextTrackDate;
	}
	public void setNextTrackDate(String nextTrackDate) {
		this.nextTrackDate = nextTrackDate;
	}
	public String getNextComtent() {
		return nextComtent;
	}
	public void setNextComtent(String nextComtent) {
		this.nextComtent = nextComtent;
	}
	public Long getReminderDate() {
		return reminderDate;
	}
	public void setReminderDate(Long reminderDate) {
		this.reminderDate = reminderDate;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public String getCreateStartTime() {
		return createStartTime;
	}
	public void setCreateStartTime(String createStartTime) {
		this.createStartTime = createStartTime;
	}
	public String getCreateEndTime() {
		return createEndTime;
	}
	public void setCreateEndTime(String createEndTime) {
		this.createEndTime = createEndTime;
	}
	
	
}
