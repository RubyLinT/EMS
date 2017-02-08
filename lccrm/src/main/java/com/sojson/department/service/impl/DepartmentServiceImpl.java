package com.sojson.department.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sojson.common.dao.DepartmentMapper;
import com.sojson.common.model.Department;
import com.sojson.core.mybatis.BaseMybatisDao;
import com.sojson.department.service.DepartmentService;

@Service
public class DepartmentServiceImpl extends BaseMybatisDao<DepartmentMapper> implements DepartmentService {

	@Autowired
	DepartmentMapper departmentMapper;
	
	/**
	 * 查询部门表全部数据 by chendf 2017/1/9
	 */
	@Override
	public List<Department> findAll() {
		return departmentMapper.findAll();
	}

	/**
	 * 根据id查询数据 by chendf 2017/1/9
	 */
	@Override
	public List<Department> findById(Long id) {
		return departmentMapper.findById(id);
	}

	/**
	 * 根据id删除数据 by chendf 2017/1/9
	 */
	@Override
	public int deleteByPrimaryKey(Long id) {
		return departmentMapper.deleteByPrimaryKey(id);
	}

	/**
	 * 修改信息 by chendf 2017/1/9
	 */
	@Override
	public int update(Department record) {
		return departmentMapper.update(record);
	}

	/**
	 * 新增部门表数据 by chendf 2017/1/9
	 */
	@Override
	public int insert(Department record) {
		return departmentMapper.insert(record);
	}

}
