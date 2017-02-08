package com.sojson.department.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.sojson.common.model.Department;

public interface DepartmentService {

	/**
	 * 查询部门表全部数据 by chendf 2017/1/9
	 * @return
	 */
	List<Department> findAll();
	
	/**
	 * 根据id查询数据 by chendf 2017/1/9
	 * @param id
	 * @return
	 */
	List<Department> findById(@Param("id") Long id);
	
	/**
	 * 根据id删除数据 by chendf 2017/1/9
	 * @param id
	 * @return
	 */
	int deleteByPrimaryKey(@Param("id") Long id);
	
	/**
	 * 修改信息 by chendf 2017/1/9
	 * @param record
	 * @return
	 */
	int update(Department record);
	
	/**
	 * 新增部门表数据 by chendf 2017/1/9
	 * @param record
	 * @return
	 */
	int insert(Department record);
}
