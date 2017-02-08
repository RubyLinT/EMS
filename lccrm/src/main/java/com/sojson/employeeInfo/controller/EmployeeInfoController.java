package com.sojson.employeeInfo.controller;

import java.util.ArrayList;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sojson.common.controller.BaseController;
import com.sojson.common.model.EmployeeInfo;
import com.sojson.common.model.UUser;
import com.sojson.common.utils.LoggerUtils;
import com.sojson.core.shiro.token.manager.TokenManager;
import com.sojson.customerInfo.bo.CustomerInfoBo;
import com.sojson.employeeInfo.bo.EmployeeInfoBo;
import com.sojson.employeeInfo.service.EmployeeInfoService;
import com.sojson.user.service.UUserService;
	
	@Controller	
	@Scope(value="prototype")
	@RequestMapping(value = "employee")
public class EmployeeInfoController extends BaseController {

	@Autowired
	EmployeeInfoService employeeInfoService;
	@Autowired
	UUserService userService;
	
	
	/**
	 * 员工信息模块，查询employeeInfo表所有数据   by yangs 2017/1/9
	 * @param employeeName
	 * @param employeePost
	 * @param department
	 * @param roleId
	 * @param employeeCellPhone
	 * @param employeeEmail
	 * @return
	 */
	@RequestMapping(value = "findAllEmployee")
	@ResponseBody
	public List<Map<String,Object>> findAllEmployee(String employeeName,String employeeCellPhone){
		
		EmployeeInfoBo bo = new EmployeeInfoBo();
		List<Map<String,Object>> mapList = new ArrayList<Map<String,Object>>();
		List<EmployeeInfo> employeeList = employeeInfoService.findAllEmployee(employeeName, employeeCellPhone);
		
		for(EmployeeInfo c : employeeList){
			Map<String, Object> m = new LinkedHashMap<String, Object>();
			m.put("id", c.getId());
			m.put("userId", c.getUserId());
			m.put("employeeName", c.getEmployeeName());
			m.put("employeeEmail", c.getEmployeeEmail());
			m.put("employeeCellPhone", c.getEmployeeCellPhone());
			
			//根据Id查询部门
			List<EmployeeInfoBo> departmentList=employeeInfoService.finddepartmentByid(c.getId());
			for(EmployeeInfoBo departmentBo : departmentList){
				bo.setDepartmentID(departmentBo.getDepartmentID());
				bo.setDepartment(departmentBo.getDepartment());
				m.put("department", bo.getDepartment());  
			}
			//根据Id查询职务
			List<EmployeeInfoBo> postList=employeeInfoService.findemployeePostByid(c.getId());
			for(EmployeeInfoBo postBo : postList){
				bo.setEmployeePostID(postBo.getEmployeePostID());
				bo.setEmployeePost(postBo.getEmployeePost());
				m.put("employeePost", bo.getEmployeePost());
			}
			mapList.add(m);
		}
		return mapList;
	}

	/**
	 * 根据主键删除员工表表数据,如果有多个，以“,”间隔。
	 * @param ids
	 * @return
	 */
	@RequestMapping(value = "deleteEmpById")
	@ResponseBody
	public Map<String,Object> deleteEmployeeById(String ids){
		return employeeInfoService.deleteEmployeeById(ids);
	}
	
	
	/**
	 * 修改员工信息
	 * @param record
	 * @return
	 */
	@RequestMapping(value = "updateEmp")
	@ResponseBody
	public Map<String, Object> updateEmp(EmployeeInfo record){
		try {
			int count = employeeInfoService.updateEmp(record);
			resultMap.put("status", 200);
			resultMap.put("successCount", count);
		} catch (Exception e) {
			resultMap.put("status", 500);
			resultMap.put("message", "修改失败，请刷新后再试！");
			
			LoggerUtils.fmtError(getClass(), e, "修改员工信息报错。source[%s]",record.toString());
		}
		return resultMap;
	}
	
	/**
	 * 新增员工数据
	 * @param record
	 * @return
	 */
	@RequestMapping(value = "insertEmp")
	@ResponseBody
	public Map<String, Object> insertEmp(EmployeeInfo record){
		try {
			//获取当前登录帐号为email
			String email = TokenManager.getToken().getEmail();
			UUser user = userService.findUserByEmail(email);
			record.setUserId(user.getId());//把查出的用户表的id放进EmployeeInfo中
			int count = employeeInfoService.insertEmp(record);
			resultMap.put("status", 200);
			resultMap.put("successCount", count);
		} catch (Exception e) {
			resultMap.put("status", 500);
			resultMap.put("message", "新增员工失败，请刷新后再试！");
			
			LoggerUtils.fmtError(getClass(), e, "新增员工信息报错。source[%s]",record.toString());
		}
		return resultMap;
	}
	
	/**
	 * 下拉框-员工职务(ygzw)
	 * by yangs 2017/1/11
	 * @param dicId
	 * @return
	 */
	@RequestMapping(value = "findDicTitleByDicId")
	@ResponseBody
	public Map<String, Object> findBycustomType(String dicId) {
			if(dicId != ""){
				List<CustomerInfoBo> list= employeeInfoService.findDicTitleByDicId(dicId);
				resultMap.put("status", 200);
				resultMap.put("successCount", list);
			}else{
				resultMap.put("status", 500);
				resultMap.put("message", "请选择一条数据！");
			}
		return resultMap;
	}
	
	/**
	 * 下拉框-查询部门名称
	 * @return
	 */
	@RequestMapping(value = "findDepartName")
	@ResponseBody
	public List<EmployeeInfoBo> findDepartName(){
		return employeeInfoService.findDepartName();
	}
	
}
