package com.sojson.employeeInfo.service;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.sojson.common.model.EmployeeInfo;
import com.sojson.customerInfo.bo.CustomerInfoBo;
import com.sojson.employeeInfo.bo.EmployeeInfoBo;

public interface EmployeeInfoService {

	/**
	 * 根据主键删除字典表数据
	 * @param id
	 * @return
	 */
	int deleteByPrimaryKey(Long id);
	
	/**
	 * 根据主键删除员工表数据,如果有多个，以“,”间隔。
	 * @param ids
	 * @return
	 */
	Map<String, Object> deleteEmployeeById(String ids);
	
	/**
	 * 新增员工数据
	 * @param record
	 * @return
	 */
	int insertEmp(EmployeeInfo record);
	
	/**
	 * 修改员工表
	 * @param record
	 * @return
	 */
	int updateEmp(EmployeeInfo record);
	
	/**
	 * 下拉框-员工职务(ygzw)
	 * @param dicId
	 * @return
	 */
	List<CustomerInfoBo> findDicTitleByDicId(@Param("dicId") String dicId);

	/**
	 * 根据id查部门
	 * @param id
	 * @return
	 */
	List<EmployeeInfoBo> finddepartmentByid(@Param("id") Long id);

	/**
	 * 根据id查部门
	 * @param id
	 * @return
	 */
	List<EmployeeInfoBo> findemployeePostByid(@Param("id") Long id);
	
	
	/**
	 * 员工信息模块，查询员工表数据
	 * @param employeeName
	 * @param employeePost
	 * @param department
	 * @param roleId
	 * @param employeeCellPhone
	 * @param employeeEmail
	 * @return
	 */
	List<EmployeeInfo> findAllEmployee(@Param("employeeName") String employeeName, 
			@Param("employeeCellPhone") String employeeCellPhone);
	
	/**
	 * 下拉框-查询部门名称
	 * @return
	 */
	List<EmployeeInfoBo> findDepartName();
}
