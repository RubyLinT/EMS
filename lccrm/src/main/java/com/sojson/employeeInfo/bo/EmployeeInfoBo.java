package com.sojson.employeeInfo.bo;

import java.io.Serializable;

public class EmployeeInfoBo implements Serializable {



	private static final long serialVersionUID = 1L;
	
	private Long id;//自增长列
	
	private Long userId;//用户id=用户表的主键id
	
	private String employeeName;//员工姓名
	
	private String employeePost;//员工职务，字典表中名为ygzw的字典id
	
	private String department;//员工部门，部门表中的部门id
	
	private String roleId;//员工角色
	
	private String employeeCellPhone;//员工手机
	
	private String employeeEmail;//员工邮箱
	
	private Long employeePostID;//员工职务ID
	
	private Long departmentID;//员工部门ID
	
	
	public Long getEmployeePostID() {
		return employeePostID;
	}

	public void setEmployeePostID(Long employeePostID) {
		this.employeePostID = employeePostID;
	}

	public Long getDepartmentID() {
		return departmentID;
	}

	public void setDepartmentID(Long departmentID) {
		this.departmentID = departmentID;
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

	public String getEmployeeName() {
		return employeeName;
	}

	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}


	public String getRoleId() {
		return roleId;
	}

	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}

	public String getEmployeeCellPhone() {
		return employeeCellPhone;
	}

	public void setEmployeeCellPhone(String employeeCellPhone) {
		this.employeeCellPhone = employeeCellPhone;
	}

	public String getEmployeeEmail() {
		return employeeEmail;
	}

	public void setEmployeeEmail(String employeeEmail) {
		this.employeeEmail = employeeEmail;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public String getEmployeePost() {
		return employeePost;
	}

	public void setEmployeePost(String employeePost) {
		this.employeePost = employeePost;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}
}
