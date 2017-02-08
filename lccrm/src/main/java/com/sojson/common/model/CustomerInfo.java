package com.sojson.common.model;

import java.io.Serializable;

public class CustomerInfo implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long id;
	private String customId;// 用户id
	private String addTime;// customFrom
	private Long addPeople;// 添加客户的账号
	private String workUnit;// 单位名称
	private Long customCity;// 所在城市
	private Long industry;// 行业
	private String address;// 公司地址
	private Long workPhone;// 公司座机
	private Long customType;// 客户类别
	private Long customState;// 客户状态
	private Long customFrom;// 客户来源
	private String ascription;// 所属业务员的账号
	private String ascriptionTime;//归属时间
	private String summary;// 客户简介
	
	public String getAscriptionTime() {
		return ascriptionTime;
	}
	public void setAscriptionTime(String ascriptionTime) {
		this.ascriptionTime = ascriptionTime;
	}
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
	public String getAddTime() {
		return addTime;
	}
	public void setAddTime(String addTime) {
		this.addTime = addTime;
	}
	public Long getAddPeople() {
		return addPeople;
	}
	public void setAddPeople(Long addPeople) {
		this.addPeople = addPeople;
	}
	public String getWorkUnit() {
		return workUnit;
	}
	public void setWorkUnit(String workUnit) {
		this.workUnit = workUnit;
	}
	public Long getCustomCity() {
		return customCity;
	}
	public void setCustomCity(Long customCity) {
		this.customCity = customCity;
	}
	public Long getIndustry() {
		return industry;
	}
	public void setIndustry(Long industry) {
		this.industry = industry;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public Long getWorkPhone() {
		return workPhone;
	}
	public void setWorkPhone(Long workPhone) {
		this.workPhone = workPhone;
	}
	public Long getCustomType() {
		return customType;
	}
	public void setCustomType(Long customType) {
		this.customType = customType;
	}
	public Long getCustomState() {
		return customState;
	}
	public void setCustomState(Long customState) {
		this.customState = customState;
	}
	public Long getCustomFrom() {
		return customFrom;
	}
	public void setCustomFrom(Long customFrom) {
		this.customFrom = customFrom;
	}
	public String getAscription() {
		return ascription;
	}
	public void setAscription(String ascription) {
		this.ascription = ascription;
	}
	public String getSummary() {
		return summary;
	}
	public void setSummary(String summary) {
		this.summary = summary;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	
}