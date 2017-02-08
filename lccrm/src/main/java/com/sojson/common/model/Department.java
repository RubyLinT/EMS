package com.sojson.common.model;

import java.io.Serializable;

public class Department implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String departName;//部门名称
	private String higherDepartId;//上级部门id
	private String remark;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getDepartName() {
		return departName;
	}
	public void setDepartName(String departName) {
		this.departName = departName;
	}
	public String getHigherDepartId() {
		return higherDepartId;
	}
	public void setHigherDepartId(String higherDepartId) {
		this.higherDepartId = higherDepartId;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
}
