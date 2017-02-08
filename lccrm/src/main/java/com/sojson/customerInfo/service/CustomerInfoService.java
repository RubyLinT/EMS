package com.sojson.customerInfo.service;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.sojson.common.model.CustomerInfo;
import com.sojson.core.mybatis.page.Pagination;
import com.sojson.customerInfo.bo.CustomerInfoBo;

public interface CustomerInfoService {

	/**
	 * 分页查询字典表的全部数据
	 * @param resultMap
	 * @param pageNo
	 * @param pageSize
	 * @return
	 */
	Pagination<CustomerInfo> findPage(Map<String,Object> resultMap, Integer pageNo,
			Integer pageSize);
	
	/**
	 * 根据id逻辑删除 by chendf 2017/1/4
	 * @param id
	 * @return
	 */
	int deleteCustomer(Long id);
	
	/**
	 * 根据id逻辑删客户表数据,如果有多个，以“,”间隔。
	 * by chendf 2017/1/4
	 * @param ids
	 * @return
	 */
	Map<String, Object> deletecustomerById(String ids);
	
	/**
	 * 分派客户
	 * @param record
	 * @return
	 */
	int updateDistributionCustomer(CustomerInfo record);
	 
	/**
	 * 释放客户
	 * @param record
	 * @return
	 */
	int releaseCustomer(Long id);
	
	/**
	 * 根据id释放客户表数据,如果有多个，以“,”间隔。
	 * @param ids
	 * @return
	 */
	Map<String, Object> releaseCustomerById(String ids);

	/**
	 * 根据id修改信息
	 * @param id
	 * @return
	 */
	int updateByid(CustomerInfo record);
	
	/**
	 * 新增用户信息
	 * @param id
	 * @return
	 */
	int addCustomer(CustomerInfo record);
	
	/**
	 * 查询客户
	 * @param record
	 * @return
	 */
	int findCustmoerByid(CustomerInfo record);
	
	/**
	 * 下拉框-客户类型(khlb),客户来源(khly) ,客户行业(khhy),客户状态(khzt),所在城市(szcs)
	 * @param dicId
	 * @return
	 */
	List<CustomerInfoBo> findDicTitleByDicId(@Param("dicId") String dicId);
	
	/**
	 * 查询客户公海
	 * @param workUnit
	 * @param customCity
	 * @param industry
	 * @param customState
	 * @return
	 */
	List<CustomerInfo> findCustomerSea(@Param("workUnit") String workUnit, @Param("customType") Long customType,
			@Param("industry") Long industry, @Param("customState") Long customState);
	
	
	/**
	 * 根据findworkUnit返回的id查类型
	 * @param id
	 * @return
	 */
	List<CustomerInfoBo> findcustomTypeByid(@Param("id") Long id);
	
	/**
	 * 根据findworkUnit返回的id查行业
	 * @param id
	 * @return
	 */
	List<CustomerInfoBo> findindustryByid(@Param("id") Long id);
	
	/**
	 * 根据findworkUnit返回的id查状态
	 * @param id
	 * @return
	 */
	List<CustomerInfoBo> findcustomStateByid(@Param("id") Long id);
	
	/**
	 * 根据findworkUnit返回的id查所在城市
	 * @param id
	 * @return
	 */
	List<CustomerInfoBo> findcustomCityByid(@Param("id") Long id);
	
	/**
	 * 根据findworkUnit返回的id查客户来源
	 * @param id
	 * @return
	 */
	List<CustomerInfoBo> findcustomFromByid(@Param("id") Long id);	
	
	/**
	 * 根据id查询所属业务员的昵称  by chendf 2017/1/9
	 * @param id
	 * @return
	 */
	List<CustomerInfoBo> findNickNameByid(@Param("id") Long id);
	
	/**
	 * 根据id查询增加人(addPeople)的昵称  by chendf 2017/1/9
	 * @param id
	 * @return
	 */
	List<CustomerInfoBo> findAddPeopleByid(@Param("id") Long id);
	
	/**
	 * 公共查询，查询dicationary表id
	 * @param id
	 * @return
	 */
	Long findUpdateId(@Param("id") String id);
	
	/**
	 * 我的客户模块，查询customer表数据
	 * @param workUnit
	 * @param customCity
	 * @param industry
	 * @param customState
	 * @return
	 */
	List<CustomerInfo> findAllCustomer(@Param("workUnit") String workUnit, @Param("customType") Long customType,
			@Param("industry") Long industry, @Param("customState") Long customState, @Param("ascription") String ascription);

	/**
	 * 客户管理模块，查询customer表所有数据   by chendf 2017/1/3
	 * @param workUnit
	 * @param customType
	 * @param industry
	 * @param customState
	 * @return
	 */
	List<CustomerInfo> findCustomerManage(@Param("workUnit") String workUnit, @Param("customType") Long customType,
			@Param("industry") Long industry, @Param("customState") Long customState);
	
	/**
	 * 查询id最大值
	 * @return
	 */
	Long selectMaxId();
	
	/**
	 * 
	 * 公司名称下拉框
	 */
	List<CustomerInfo> findWorkUnit();
}
