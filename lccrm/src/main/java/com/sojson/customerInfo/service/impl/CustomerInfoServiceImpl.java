package com.sojson.customerInfo.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sojson.common.dao.CustomerInfoMapper;
import com.sojson.common.model.CustomerInfo;
import com.sojson.common.utils.LoggerUtils;
import com.sojson.core.mybatis.BaseMybatisDao;
import com.sojson.core.mybatis.page.Pagination;
import com.sojson.customerInfo.bo.CustomerInfoBo;
import com.sojson.customerInfo.service.CustomerInfoService;

@Service
public class CustomerInfoServiceImpl extends BaseMybatisDao<CustomerInfoMapper> implements CustomerInfoService{

	@Autowired
	CustomerInfoMapper customerInfoMapper;
	
	@SuppressWarnings("unchecked")
	@Override
	public Pagination<CustomerInfo> findPage(Map<String, Object> resultMap, Integer pageNo, Integer pageSize) {
		return super.findPage(resultMap, pageNo, pageSize);
	}

	/**
	 * 逻辑删 by chendf 2017/1/4
	 */	
	@Override
	public int deleteCustomer(Long id) {
		return customerInfoMapper.deleteCustomer(id);
	}
 
	/**
	 * 根据id删除字典表数据,如果有多个，以“,”间隔。
	 *  by chendf 2017/1/4
	 */
	@Override
	public Map<String, Object> deletecustomerById(String ids) {
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
				count+=this.deleteCustomer(new Long(id));
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
	 * 根据id更新
	 */
	@Override
	public int updateByid(CustomerInfo record) {
		return customerInfoMapper.updateByid(record);
	}
	
	/**
	 * 添加客户
	 */
	@Override
	public int addCustomer(CustomerInfo record) {
		return customerInfoMapper.addCustomer(record);
	}

	@Override
	public int findCustmoerByid(CustomerInfo record) {
		return customerInfoMapper.findCustmoerByid(record);
	}

	/**
	 * 客户公海查询客户数据
	 */
	@Override
	public List<CustomerInfo> findCustomerSea(String workUnit, Long customType, Long industry, Long customState) {
		return customerInfoMapper.findCustomerSea(workUnit, customType, industry, customState);
	}

	@Override
	public List<CustomerInfoBo> findcustomTypeByid(Long id) {
		return customerInfoMapper.findcustomTypeByid(id);
	}


	/**
	 * 根据findworkUnit返回的id查行业
	 */
	@Override
	public List<CustomerInfoBo> findindustryByid(Long id) {
		return customerInfoMapper.findindustryByid(id);
	}
	/**
	 * 根据findworkUnit返回的id查状态
	 */
	@Override
	public List<CustomerInfoBo> findcustomStateByid(Long id) {
		return customerInfoMapper.findcustomStateByid(id);
	}
	/**
	 * 根据findworkUnit返回的id查所在城市
	 */
	@Override
	public List<CustomerInfoBo> findcustomCityByid(Long id) {
		return customerInfoMapper.findcustomCityByid(id);
	}
	/**
	 * 根据findworkUnit返回的id查客户来源
	 */
	@Override
	public List<CustomerInfoBo> findcustomFromByid(Long id) {
		return customerInfoMapper.findcustomFromByid(id);
	}
	
	/**
	 * 根据id查询所属业务员的昵称  by chendf 2017/1/9
	 */
	@Override
	public List<CustomerInfoBo> findNickNameByid(Long id) {
		return customerInfoMapper.findNickNameByid(id);
	}
	
	/**
	 * 根据id查询增加人(addPeople)的昵称  by chendf 2017/1/9
	 */
	@Override
	public List<CustomerInfoBo> findAddPeopleByid(Long id){
		return customerInfoMapper.findAddPeopleByid(id);
	}
	
	/**
	 * 公共查询，查询dicationary表id
	 */
	@Override
	public Long findUpdateId(String id) {
		return customerInfoMapper.findUpdateId(id);
	}

	/**
	 * 查询customer表数据
	 */
	@Override
	public List<CustomerInfo> findAllCustomer(String workUnit, Long customType, Long industry, Long customState, String ascription) {
		return customerInfoMapper.findAllCustomer(workUnit, customType, industry, customState, ascription);
	}
	
	/**
	 * 下拉框-客户类型(khlb),客户来源(khly) ,客户行业(khhy),客户状态(khzt),所在城市(szcs)
	 * by chendf
	 */
	@Override
	public List<CustomerInfoBo> findDicTitleByDicId(String dicId) {
		return customerInfoMapper.findDicTitleByDicId(dicId);
	}
	/**
	 * 释放客户
	 */
	@Override
	public int releaseCustomer(Long id) {
		return customerInfoMapper.releaseCustomer(id);
	}
	/**
	 * 根据id释放客户,如果有多个，以“,”间隔。
	 */
	@Override
	public Map<String, Object> releaseCustomerById(String ids) {
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
				count+=this.releaseCustomer(new Long(id));
			}
			resultMap.put("status", 200);
			resultMap.put("count", count);
		} catch (Exception e) {
			LoggerUtils.fmtError(getClass(), e, "根据IDS释放用户出现错误，ids[%s]", ids);
			resultMap.put("status", 500);
			resultMap.put("message", "释放出现错误，请刷新后再试！");
		}
		return resultMap;
	}

	/**
	 * 客户管理模块，查询customer表所有数据   by chendf 2017/1/3
	 */
	@Override
	public List<CustomerInfo> findCustomerManage(String workUnit, Long customType, Long industry, Long customState) {
		return customerInfoMapper.findCustomerManage(workUnit, customType, industry, customState);
	}

	/**
	 * 分派客户
	 */
	@Override
	public int updateDistributionCustomer(CustomerInfo record) {
		return customerInfoMapper.updateDistributionCustomer(record);
	}

	/**
	 * 查询id最大值
	 * @return
	 */
	@Override
	public Long selectMaxId() {
		return customerInfoMapper.selectMaxId();
	}

	@Override
	public List<CustomerInfo> findWorkUnit() {
		return customerInfoMapper.findWorkUnit();
	}

}
