package com.sojson.customerTrack.bo;

import java.text.SimpleDateFormat;
import java.util.Date;

public class CustomerTrackBo {
	private Long id;
	private String linkMan;// 联系人信息表中联系人姓名
	private Long contactId;// 联系人ID
	private String workUnit;// 单位名称
	private String customId;// 客户ID
	private String recordTime; //记录时间
	private String trackContent; //跟进内容，富文本，可文字和图片
	private String	trackFile; //附件地址，要求相对路径，不可用c:d：之类的绝对路径
	private String nextTrackDate; //预计下次跟进时间
	private String nextComtent; //预计跟进内容，纯文本
	private Long  reminderDate; //提前几天提醒，可不选，选择了就录入提醒表
	private String ascription;//跟踪人
	
	private String nickname;
	
	
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	public Long getContactId() {
		return contactId;
	}
	public void setContactId(Long contactId) {
		this.contactId = contactId;
	}
	public String getLinkMan() {
		return linkMan;
	}
	public void setLinkMan(String linkMan) {
		this.linkMan = linkMan;
	}
	public String getWorkUnit() {
		return workUnit;
	}
	public void setWorkUnit(String workUnit) {
		this.workUnit = workUnit;
	}
	public String getCustomId() {
		return customId;
	}
	public void setCustomId(String customId) {
		this.customId = customId;
	}
	
	public String getRecordTime() {
		return recordTime;
	}
	public void setRecordTime(Date recordTime) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		this.recordTime = sdf.format(recordTime);
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
	public String getAscription() {
		return ascription;
	}
	public void setAscription(String ascription) {
		this.ascription = ascription;
	}
	

}
