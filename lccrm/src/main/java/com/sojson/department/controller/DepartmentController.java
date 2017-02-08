package com.sojson.department.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sojson.common.controller.BaseController;
import com.sojson.common.model.CustomerInfo;
import com.sojson.common.model.Department;
import com.sojson.common.model.UUser;
import com.sojson.common.utils.LoggerUtils;
import com.sojson.core.shiro.token.manager.TokenManager;
import com.sojson.department.service.DepartmentService;

@Controller
@Scope(value="prototype")
@RequestMapping(value = "department")
public class DepartmentController extends BaseController{
	
	@Autowired
	DepartmentService departmentService;
	
	/**
	 * 查询部门表全部数据 by chendf 2017/1/9
	 * @return
	 */
	@RequestMapping(value = "findAll")
	@ResponseBody
	public List<Department> findAll(){
		List<Department> list = departmentService.findAll();
		return list;
	}
	
	/**
	 * 修改信息 by chendf 2017/1/9
	 * @param record
	 * @return
	 */
	@RequestMapping(value = "update")
	@ResponseBody
	public int update(Department record) {
		return departmentService.update(record);
	}
	
	/**
	 * 新增部门表数据 by chendf 2017/1/9
	 * @param record
	 * @return
	 */
	@RequestMapping(value = "add")
	@ResponseBody
	public Map<String,Object> addDepartment(Department record){
		try {
			int count = departmentService.insert(record);
			resultMap.put("status", 200);
			resultMap.put("successCount", count);
		} catch (Exception e) {
			resultMap.put("status", 500);
			resultMap.put("message", "添加失败，请刷新后再试！");
			LoggerUtils.fmtError(getClass(), e, "新增部门报错。source[%s]",record.toString());
		}
		return resultMap;
	}
	
	/**
	 * 根据id删除数据 by chendf 2017/1/9
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "delete")
	@ResponseBody
	public Map<String,Object> delete(Long id){
		try {
			int count = departmentService.deleteByPrimaryKey(id);
			resultMap.put("status", 200);
			resultMap.put("successCount", count);
		} catch (Exception e) {
			resultMap.put("status", 500);
			resultMap.put("message", "删除失败，请刷新后再试！");
			LoggerUtils.fmtError(getClass(), e, "删除报错。source[%s]",id.toString());
		}
		return resultMap;
	}

}
