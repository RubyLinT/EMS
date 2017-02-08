package com.sojson.department.bo;

public class DepartmentBo {

	private Long id;
	private String departName;//部门名称
	private String higherDepartId;//上级部门id
	private String Remark;
	
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
		return Remark;
	}
	public void setRemark(String remark) {
		Remark = remark;
	}
}
