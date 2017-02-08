package com.sojson.common.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.sojson.common.model.CustomerTrack;
import com.sojson.customerTrack.bo.CustomerTrackBo;

public interface CustomerTrackMapper {

	/**
	 * 客户跟进模块，查询跟进表数据
	 * @param customId
	 * @param ascription
	 * @return
	 */
	List<CustomerTrack> findCustomerTrack(@Param("customId") String customId, 
			@Param("ascription") String ascription,@Param("createStartTime") String createStartTime,
			@Param("createEndTime") String createEndTime);	
	
	/**
	 * 根据返回的id查联系人
	 * @param id
	 * @return
	 */
	List<CustomerTrackBo> findContacById(@Param("id") Long id);

	/**
	 * 根据返回的Id查公司名称
	 * @param Id
	 * @return
	 */
	List<CustomerTrackBo> findworkUnitById(@Param("id") Long id);
	
	/**
	 * 根据返回的customeId查联系人
	 * @param id
	 * @return
	 */
	List<CustomerTrackBo> findTrackBycustomId(@Param("customId") String customId);

	/**
	 * 根据输入的联系人得到id
	 * @param id
	 * @return
	 */
	List<CustomerTrackBo> findContactInfo(@Param("linkMan") String linkMan);
	
	/**
	 * 新增跟进记录
	 * @param record
	 * @return
	 */
	int addTrack(CustomerTrackBo record);
	
	/**
	 * 根据id查询跟进人(ascription)的昵称  by chendf 2017/1/20
	 * @param id
	 * @return
	 */
	List<CustomerTrackBo> findAscriptionByid(@Param("id") Long id);
	
	/**
	 * 根据id删除数据 
	 * @param id
	 * @return
	 */
	int deleteById(@Param("id") Long id);
	
} 
