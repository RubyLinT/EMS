package com.sojson.customerInfo.bo;

public class CustomerInfoBo {
	
	private Long id;

	private String addTime;// customFrom

	private String workUnit;// 单位名称

	private String customCity;// 所在城市

	private String industry;// 行业

	private String customType;// 客户类别

	private String customState;// 客户状态

	private String customFrom;// 客户来源

	private String dicTitle;// 字典表中字典内容
	
	private String ascription;// 所属业务员

	private Long customCityId;// 所在城市Id
	
	private Long industryId;// 行业Id
	
	private Long customTypeId;// 客户类别Id
	
	private Long customStateId;// 客户状态Id
	
	private Long customFromId;// 客户类别Id
	
	private String addPeople;//增加人
	
	public String getAddPeople() {
		return addPeople;
	}
	public void setAddPeople(String addPeople) {
		this.addPeople = addPeople;
	}
	public String getAscription() {
		return ascription;
	}
	public void setAscription(String ascription) {
		this.ascription = ascription;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getAddTime() {
		return addTime;
	}
	public void setAddTime(String addTime) {
		this.addTime = addTime;
	}
	public String getWorkUnit() {
		return workUnit;
	}
	public void setWorkUnit(String workUnit) {
		this.workUnit = workUnit;
	}
	public String getCustomCity() {
		return customCity;
	}
	public void setCustomCity(String customCity) {
		this.customCity = customCity;
	}
	public String getIndustry() {
		return industry;
	}
	public void setIndustry(String industry) {
		this.industry = industry;
	}
	public String getCustomType() {
		return customType;
	}
	public void setCustomType(String customType) {
		this.customType = customType;
	}
	public String getCustomState() {
		return customState;
	}
	public void setCustomState(String customState) {
		this.customState = customState;
	}
	public String getCustomFrom() {
		return customFrom;
	}
	public void setCustomFrom(String customFrom) {
		this.customFrom = customFrom;
	}
	public String getDicTitle() {
		return dicTitle;
	}
	public void setDicTitle(String dicTitle) {
		this.dicTitle = dicTitle;
	}
	public Long getCustomCityId() {
		return customCityId;
	}
	public void setCustomCityId(Long customCityId) {
		this.customCityId = customCityId;
	}
	public Long getIndustryId() {
		return industryId;
	}
	public void setIndustryId(Long industryId) {
		this.industryId = industryId;
	}
	public Long getCustomTypeId() {
		return customTypeId;
	}
	public void setCustomTypeId(Long customTypeId) {
		this.customTypeId = customTypeId;
	}
	public Long getCustomStateId() {
		return customStateId;
	}
	public void setCustomStateId(Long customStateId) {
		this.customStateId = customStateId;
	}
	public Long getCustomFromId() {
		return customFromId;
	}
	public void setCustomFromId(Long customFromId) {
		this.customFromId = customFromId;
	}
	
}
