package com.sojson.customerTrack.service;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.sojson.common.model.CustomerTrack;
import com.sojson.customerTrack.bo.CustomerTrackBo;

public interface CustomerTrackService {

	/**
	 * 跟进记录模块，查询跟进记录
	 * 
	 * @param customId
	 * @param ascription
	 * @return
	 */
	List<CustomerTrack> findCustomerTrack(@Param("customId") String customId, 
			@Param("ascription") String ascription,
			@Param("createStartTime") String createStartTime,
			@Param("createEndTime") String createEndTime);

	/**
	 * 根据返回的id查联系人
	 * 
	 * @param id
	 * @return
	 */
	List<CustomerTrackBo> findContacById(@Param("id") Long id);

	/**
	 * 根据返回的customId查公司名称
	 * 
	 * @param customId
	 * @return
	 */
	List<CustomerTrackBo> findworkUnitById(@Param("id") Long id);

	/**
	 * 根据返回的customeId查联系人
	 * 
	 * @param id
	 * @return
	 */
	List<CustomerTrackBo> findTrackBycustomId(@Param("customId") String customId);

	/**
	 * 根据输入的联系人得到id
	 * 
	 * @param id
	 * @return
	 */
	List<CustomerTrackBo> findContactInfo(@Param("linkMan") String linkMan);

	/**
	 * 新增跟进记录
	 * 
	 * @param record
	 * @return
	 */
	int addTrack(CustomerTrackBo record);

	/**
	 * 根据id查询跟进人(ascription)的昵称 by chendf 2017/1/20
	 * 
	 * @param id
	 * @return
	 */
	List<CustomerTrackBo> findAscriptionByid(@Param("id") Long id);

	/**
	 * 根据id删除数据
	 * 
	 * @param id
	 * @return
	 */
	int deleteById(@Param("id") Long id);

	/**
	 * 根据id删除跟进记录数据,如果有多个，以“,”间隔。
	 * 
	 * @param ids(删除多个)
	 * @return
	 */
	Map<String, Object> deleteTrackById(String ids);

}
