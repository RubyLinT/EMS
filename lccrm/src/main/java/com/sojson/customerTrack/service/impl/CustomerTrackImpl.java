package com.sojson.customerTrack.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sojson.common.dao.CustomerTrackMapper;
import com.sojson.common.model.CustomerTrack;
import com.sojson.common.utils.LoggerUtils;
import com.sojson.customerTrack.bo.CustomerTrackBo;
import com.sojson.customerTrack.service.CustomerTrackService;

@Service
public class CustomerTrackImpl implements CustomerTrackService {

	@Autowired
	CustomerTrackMapper customerTrackMapper;


	/**
	 * 根据返回的id查联系人
	 * 
	 * @param id
	 * @return
	 */
	@Override
	public List<CustomerTrackBo> findContacById(Long id) {
		return customerTrackMapper.findContacById(id);
	}

	/**
	 * 根据返回的customId查公司名称
	 * 
	 * @param customId
	 * @return
	 */
	@Override
	public List<CustomerTrackBo> findworkUnitById(Long id) {
		return customerTrackMapper.findworkUnitById(id);
	}

	/**
	 * 根据返回的customeId查联系人
	 * 
	 * @param id
	 * @return
	 */
	@Override
	public List<CustomerTrackBo> findTrackBycustomId(String customId) {
		return customerTrackMapper.findTrackBycustomId(customId);
	}

	/**
	 * 新增跟进记录
	 * 
	 * @param record
	 * @return
	 */
	@Override
	public int addTrack(CustomerTrackBo record) {
		return customerTrackMapper.addTrack(record);
	}

	/**
	 * 根据输入的联系人得到id
	 * 
	 * @param id
	 * @return
	 */
	@Override
	public List<CustomerTrackBo> findContactInfo(String linkMan) {
		return customerTrackMapper.findContactInfo(linkMan);
	}

	/**
	 * 根据id查询跟进人(ascription)的昵称 by chendf 2017/1/20
	 */
	@Override
	public List<CustomerTrackBo> findAscriptionByid(Long id) {
		return customerTrackMapper.findAscriptionByid(id);
	}

	/**
	 * 根据id删除数据
	 * 
	 * @param id
	 * @return
	 */
	@Override
	public int deleteById(Long id) {
		return customerTrackMapper.deleteById(id);
	}

	/**
	 * 根据id删除跟进记录数据,如果有多个，以“,”间隔。
	 * 
	 * @param ids(删除多个)
	 * @return
	 */
	@Override
	public Map<String, Object> deleteTrackById(String ids) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		try {
			int count = 0;
			String[] idArray = new String[] {};
			if (StringUtils.contains(ids, ",")) {
				idArray = ids.split(",");
			} else {
				idArray = new String[] { ids };
			}

			for (String id : idArray) {
				count += this.deleteById(new Long(id));
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

	/**
	 * 跟进记录模块，查询跟进记录
	 * 
	 * @param customId
	 * @param ascription
	 * @return
	 */
	@Override
	public List<CustomerTrack> findCustomerTrack(String customId, String ascription, String createStartTime,
			String createEndTime) {
		return customerTrackMapper.findCustomerTrack(customId, ascription, createStartTime, createEndTime);
	}

}
