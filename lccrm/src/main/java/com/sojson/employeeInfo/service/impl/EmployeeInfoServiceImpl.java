package com.sojson.employeeInfo.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sojson.common.dao.EmployeeInfoMapper;
import com.sojson.common.model.EmployeeInfo;
import com.sojson.common.utils.LoggerUtils;
import com.sojson.core.mybatis.BaseMybatisDao;
import com.sojson.customerInfo.bo.CustomerInfoBo;
import com.sojson.employeeInfo.bo.EmployeeInfoBo;
import com.sojson.employeeInfo.service.EmployeeInfoService;

@Service
public class EmployeeInfoServiceImpl extends BaseMybatisDao<EmployeeInfoMapper> implements EmployeeInfoService {
	@Autowired
	EmployeeInfoMapper employeeInfoMapper;
	
	@Override
	public int deleteByPrimaryKey(Long id) {
		return employeeInfoMapper.deleteByPrimaryKey(id);
	}

	@Override
	public int insertEmp(EmployeeInfo record) {
		return employeeInfoMapper.insertEmp(record);
	}

	@Override
	public int updateEmp(EmployeeInfo record) {
		return employeeInfoMapper.updateEmp(record);
	}

	@Override
	public List<EmployeeInfoBo> finddepartmentByid(Long id) {
		return employeeInfoMapper.finddepartmentByid(id);
	}

	@Override
	public List<EmployeeInfoBo> findemployeePostByid(Long id) {
		return employeeInfoMapper.findemployeePostByid(id);
	}

	@Override
	public Map<String, Object> deleteEmployeeById(String ids) {
		Map<String,Object> resultMap = new HashMap<String,Object>();
		try {
			int count=0;
			String[] idArray = new String[]{};
			if(StringUtils.contains(ids, ",")){
				idArray = ids.split(",");
			}else{
				idArray = new String[]{ids};
			}
			
			for (String id : idArray) {
				count+=this.deleteByPrimaryKey(new Long(id));
			}
			resultMap.put("status", 200);
			resultMap.put("count", count);
		} catch (Exception e) {
			LoggerUtils.fmtError(getClass(), e, "根据IDS删除用户出现错误，ids[%s]", ids);
			resultMap.put("status", 500);
			resultMap.put("message", "删除出现错误，请刷新后再试！");
		}
		return resultMap;
	}

	@Override
	public List<EmployeeInfo> findAllEmployee(String employeeName, String employeeCellPhone) {
		return employeeInfoMapper.findAllEmployee(employeeName, employeeCellPhone);
	}

	/**
	 * 下拉框-查询部门名称
	 */
	@Override
	public List<EmployeeInfoBo> findDepartName() {
		return employeeInfoMapper.findDepartName();
	}

	@Override
	public List<CustomerInfoBo> findDicTitleByDicId(String dicId) {
		return employeeInfoMapper.findDicTitleByDicId(dicId);
	}

}

