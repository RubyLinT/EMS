package com.sojson.customerInfo.controller;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sojson.common.controller.BaseController;
import com.sojson.common.model.CustomerInfo;
import com.sojson.common.model.UUser;
import com.sojson.common.utils.DateUtil;
import com.sojson.common.utils.ExcelUtil;
import com.sojson.common.utils.LoggerUtils;
import com.sojson.core.shiro.token.manager.TokenManager;
import com.sojson.customerInfo.bo.CustomerInfoBo;
import com.sojson.customerInfo.service.CustomerInfoService;
import com.sojson.user.service.UUserService;

@Controller
@Scope(value="prototype")
@RequestMapping(value = "customer")
public class CustomerInfoController extends BaseController {

	@Autowired
	CustomerInfoService customerInfoService;
	@Autowired
	UUserService userService;
	
	private SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
	
	/**
	 * 根据id查询客户表数据
	 * by chendf 2016/12/29
	 * @param workUnit
	 * @param customType
	 * @param industry
	 * @param customState
	 * @return
	 */
	@RequestMapping(value = "findworkUnit")
	@ResponseBody
	public List<Map<String,Object>> findworkUnit(String workUnit, Long customType,Long industry,Long customState){
		String ascription = TokenManager.getToken().getEmail();
		CustomerInfoBo bo = new CustomerInfoBo();
		List<Map<String,Object>> mapList = new ArrayList<Map<String,Object>>();
//		Map<String, Object> map = new HashMap<String, Object>();
		List<CustomerInfo> customerList = customerInfoService.findAllCustomer(workUnit, customType, industry, customState, ascription);
		
		for(CustomerInfo c : customerList){
			Map<String, Object> m = new LinkedHashMap<String, Object>();
			bo.setId(c.getId());
			bo.setWorkUnit(c.getWorkUnit());
			m.put("id", c.getId());
			m.put("workUnit", bo.getWorkUnit());
			if(c.getAddTime() != null){
				try {
					m.put("addTime", df.format(df.parse(c.getAddTime())));
				} catch (ParseException e) {
					e.printStackTrace();
				}
			}
			m.put("address", c.getAddress());
			m.put("workPhone", c.getWorkPhone());
			m.put("summary", c.getSummary());
			
			//根据findAllCustomer中的Id查询客户类别，及Id
			List<CustomerInfoBo> typeList=customerInfoService.findcustomTypeByid(c.getId());
			for(CustomerInfoBo typeBo : typeList){
				m.put("customTypeId", typeBo.getCustomTypeId());  
				m.put("customType", typeBo.getCustomType());  
			}
			//根据findAllCustomer中的Id查询所在城市，及Id
			List<CustomerInfoBo> cityList=customerInfoService.findcustomCityByid(c.getId());
			for(CustomerInfoBo cityBo : cityList){
				m.put("customCityId", cityBo.getCustomCityId());
				m.put("customCity", cityBo.getCustomCity());
			}
			//根据findAllCustomer中的Id查询客户行业，及Id
			List<CustomerInfoBo> industryList=customerInfoService.findindustryByid(c.getId());
			for(CustomerInfoBo industryBo : industryList){
				m.put("industryId", industryBo.getIndustryId());
				m.put("industry", industryBo.getIndustry());
			}
			//根据findAllCustomer中的Id查询客户状态，及Id
			List<CustomerInfoBo> stateList=customerInfoService.findcustomStateByid(c.getId());
			for(CustomerInfoBo stateBo : stateList){
				m.put("customStateId", stateBo.getCustomStateId());
				m.put("customState", stateBo.getCustomState());
			}	
			//根据findAllCustomer中的Id查询客户来源，及Id
			List<CustomerInfoBo> fromList=customerInfoService.findcustomFromByid(c.getId());
			for(CustomerInfoBo formBo : fromList){
				m.put("customFromId", formBo.getCustomFromId());
				m.put("customFrom", formBo.getCustomFrom());
			}
			//根据id查询增加人(addPeople)的昵称  by chendf 2017/1/9
			List<CustomerInfoBo> addPeopleList=customerInfoService.findAddPeopleByid(c.getId());
			for(CustomerInfoBo addPeopleBo : addPeopleList){
				m.put("addPeople", addPeopleBo.getAddPeople());
			}
			mapList.add(m);
		}
		
//		JSONArray jsonarray = JSONArray.fromObject(mapList);
		return mapList;
	}
	
	
	/**
	 * 根据id,逻辑删除
	 * 
	 * @param ids
	 * @return
	 */
	@RequestMapping(value = "deleteCustomerByid", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> deletecustomerById(String ids) {
		return customerInfoService.deletecustomerById(ids);
	}
	
	/**
	 * 修改客户信息
	 * by chendf 2016/12/29
	 * @param record
	 * @return
	 */
	@RequestMapping(value = "update",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> updateByid(CustomerInfo record){
		try {
			String email = TokenManager.getToken().getEmail();
			if(email.equals("admin") == false){
				record.setAscription(email);
			}
			int count = customerInfoService.updateByid(record);
			resultMap.put("status", 200);
			resultMap.put("successCount", count);
		} catch (Exception e) {
			resultMap.put("status", 500);
			resultMap.put("message", "修改失败，请刷新后再试！");
			
			LoggerUtils.fmtError(getClass(), e, "修改客户信息报错。source[%s]",record.toString());
		}
		return resultMap;
	}
	
	/**
	 * 我的客户新增客户数据
	 * by chendf 2016/12/29
	 * @param record
	 * @return
	 */
	@RequestMapping(value = "addCustomer")
	@ResponseBody
	public Map<String,Object> addDictionary(HttpServletRequest request, CustomerInfo record){
		try {
			//获取当前登录帐号为email
			String email = TokenManager.getToken().getEmail();
			String ascription = record.getAscription();
			int count;
			Long id = customerInfoService.selectMaxId();
			Long customId = id + 1;
			record.setCustomId(customId.toString());
			if (ascription.equals("")||ascription.equals("null")) {
				UUser user = userService.findUserByEmail(email);
				record.setAddPeople(user.getId());
				record.setAscription(email);
				count = customerInfoService.addCustomer(record);
				resultMap.put("status", 200);
				resultMap.put("successCount", count);
			} else {
				count = customerInfoService.addCustomer(record);
				resultMap.put("status", 200);
				resultMap.put("successCount", count);
			}

		} catch (Exception e) {
			resultMap.put("status", 500);
			resultMap.put("message", "添加失败，请刷新后再试！");
			LoggerUtils.fmtError(getClass(), e, "新增客户报错。source[%s]",record.toString());
		}
		return resultMap;
	}
	
	
	/**
	 * 客户管理新增客户数据
	 * @param record
	 * @return
	 */
	@RequestMapping(value = "addCustomerformanage")
	@ResponseBody
	public Map<String,Object> addDictionaryformanage(HttpServletRequest request, CustomerInfo record){
		try {
			int count;
			Long id = customerInfoService.selectMaxId();
			Long customId = id + 1;
			record.setCustomId(customId.toString());
				count = customerInfoService.addCustomer(record);
				resultMap.put("status", 200);
				resultMap.put("successCount", count);
		} catch (Exception e) {
			resultMap.put("status", 500);
			resultMap.put("message", "添加失败，请刷新后再试！");
			LoggerUtils.fmtError(getClass(), e, "新增客户报错。source[%s]",record.toString());
		}
		return resultMap;
	}
	/**
	 * 释放客户信息
	 * @param record
	 * @return
	 */
	@RequestMapping(value = "releaseCustomer")
	@ResponseBody
	public Map<String, Object> releaseCustomer(String ids) {
		return customerInfoService.releaseCustomerById(ids);
	}
	
	/**
	 * 分派客户
	 * @param record
	 * @return
	 */
	@RequestMapping(value = "updateDistributionCustomer")
	@ResponseBody
	public int updateDistributionCustomer(CustomerInfo record) {
		
		try {
			//获取当前登录帐号为email
			String ascription = TokenManager.getToken().getEmail();
			if(ascription != null){
				UUser user = userService.findUserByEmail(ascription);
				record.setAscription(ascription);;
				int count = customerInfoService.updateDistributionCustomer(record);
				resultMap.put("status", 200);
				resultMap.put("successCount", count);
			}else{
				resultMap.put("status", 500);
				resultMap.put("message", "未登录！");
			}
		} catch (Exception e) {
			resultMap.put("status", 500);
			resultMap.put("message", "添加失败，请刷新后再试！");
			LoggerUtils.fmtError(getClass(), e, "分派客户报错。source[%s]",record.toString());
		}
		return customerInfoService.updateDistributionCustomer(record);	
		}
	
	
	/**
	 * 根据id,查询信息
	 * @param ids
	 * @return
	 */
	@RequestMapping(value = "findCustmoerByid")
	@ResponseBody
	public int findCustmoerByid(CustomerInfo record) {
		return customerInfoService.findCustmoerByid(record);
	}
	
	/**
	 * 下拉框-客户类型(khlb),客户来源(khly) ,客户行业(khhy),客户状态(khzt),所在城市(szcs)
	 * by chendf 2016/12/29
	 * @param dicId
	 * @return
	 */
	@RequestMapping(value = "findDicTitleByDicId")
	@ResponseBody
	public Map<String, Object> findBycustomType(String dicId) {
			if(dicId != ""){
				List<CustomerInfoBo> list= customerInfoService.findDicTitleByDicId(dicId);
				resultMap.put("status", 200);
				resultMap.put("successCount", list);
			}else{
				resultMap.put("status", 500);
				resultMap.put("message", "请选择一条数据！");
			}
		return resultMap;
	}
	
	/**
	 * 导出客户管理excel表
	 * by chendf 2017/1/13
	 * @param request
	 * @param response
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "export")
	public Map<String, Object> export(HttpServletRequest request, HttpServletResponse response)
			throws IOException{
		
		String fileName = DateUtil.getTimeFormat(new Date(), "yyyyMMddhhmmssSSS") 
													+ "_" + (int) (Math.random() * 100);
		List<Map<String,Object>> mapList = new ArrayList<Map<String,Object>>();

		List<CustomerInfo> customerList = customerInfoService.findCustomerManage("", null, null, null);
		for(CustomerInfo c : customerList){
			Map<String, Object> m = new LinkedHashMap<String, Object>();
			m.put("id", c.getId());
			m.put("workUnit", c.getWorkUnit());
			if(c.getAddTime() != null){
				try {
					m.put("addTime", df.format(df.parse(c.getAddTime())));
				} catch (ParseException e) {
					e.printStackTrace();
				}
			}
			m.put("address", c.getAddress());
			m.put("workPhone", c.getWorkPhone());
			if(c.getAscriptionTime() != null){
				try {
					m.put("ascriptionTime", df.format(df.parse(c.getAscriptionTime())));
				} catch (ParseException e) {
					e.printStackTrace();
				}
			}
			m.put("summary", c.getSummary());
			
			//根据findAllCustomer中的Id查询客户类别，及Id
			List<CustomerInfoBo> typeList=customerInfoService.findcustomTypeByid(c.getId());
			for(CustomerInfoBo typeBo : typeList){
				m.put("customType", typeBo.getCustomType());  
			}
			//根据findAllCustomer中的Id查询所在城市，及Id
			List<CustomerInfoBo> cityList=customerInfoService.findcustomCityByid(c.getId());
			for(CustomerInfoBo cityBo : cityList){
				m.put("customCity", cityBo.getCustomCity());
			}
			//根据findAllCustomer中的Id查询客户行业，及Id
			List<CustomerInfoBo> industryList=customerInfoService.findindustryByid(c.getId());
			for(CustomerInfoBo industryBo : industryList){
				m.put("industry", industryBo.getIndustry());
			}
			//根据findAllCustomer中的Id查询客户状态，及Id
			List<CustomerInfoBo> stateList=customerInfoService.findcustomStateByid(c.getId());
			for(CustomerInfoBo stateBo : stateList){
				m.put("customState", stateBo.getCustomState());
			}	
			//根据findAllCustomer中的Id查询客户来源，及Id
			List<CustomerInfoBo> fromList=customerInfoService.findcustomFromByid(c.getId());
			for(CustomerInfoBo formBo : fromList){
				m.put("customFrom", formBo.getCustomFrom());
			}
			//根据id查询所属业务员的昵称  by chendf 2017/1/9
			List<CustomerInfoBo> nickNameList=customerInfoService.findNickNameByid(c.getId());
			for(CustomerInfoBo nickNameBo : nickNameList){
				m.put("ascription", nickNameBo.getAscription());
			}
			//根据id查询增加人(addPeople)的昵称  by chendf 2017/1/9
			List<CustomerInfoBo> addPeopleList=customerInfoService.findAddPeopleByid(c.getId());
			for(CustomerInfoBo addPeopleBo : addPeopleList){
				m.put("addPeople", addPeopleBo.getAddPeople());
			}
			mapList.add(m);
		}
		if(mapList == null || mapList.size()<=0){
			resultMap.put("fail", "is null!");
			return resultMap;
		}
		String columnNames[]={"单位名称","类型","行业","状态","所在城市","客户来源","公司地址","公司座机","客户简介","所属业务员","归属日期","添加人","添加日期"};//列名
	    String keys[] = {"workUnit","customType","industry","customState","customCity","customFrom","address","workPhone","summary","ascription","ascriptionTime","addPeople","addTime"};//map中的key
	    ByteArrayOutputStream os = new ByteArrayOutputStream();
	    try {
	    	ExcelUtil.createWorkBook(mapList,keys,columnNames).write(os);
	    } catch (IOException e) {
	        e.printStackTrace();
	    }
	    try {
			
		    byte[] content = os.toByteArray();
		    InputStream is = new ByteArrayInputStream(content);
	       
		    // 设置response参数，可以打开下载页面
	        response.reset();
	        response.setContentType("application/vnd.ms-excel;charset=utf-8");
	        response.setHeader("Content-Disposition", "attachment;filename="+ new String((fileName + ".xls").getBytes(), "iso-8859-1"));
	        ServletOutputStream out = response.getOutputStream();
	        BufferedInputStream bis = null;
	        BufferedOutputStream bos = null;
	        try {
	            bis = new BufferedInputStream(is);
	            bos = new BufferedOutputStream(out);
	            byte[] buff = new byte[2048];
	            int bytesRead;
	            // Simple read/write loop.
	            while (-1 != (bytesRead = bis.read(buff, 0, buff.length))) {
	                bos.write(buff, 0, bytesRead);
	            }
	        } catch (final IOException e) {
	            throw e;
	        } finally {
	            if (bis != null)
	                bis.close();
	            if (bos != null)
	                bos.close();
	        }
	        resultMap.put("status", 200);
	        resultMap.put("success", mapList);
	    } catch (Exception e) {
	    	resultMap.put("status", 500);
			e.printStackTrace();
		}
	    
		return resultMap;
	}
	
	/**
	 * 客户管理模块，查询customer表所有数据   by chendf 2017/1/3
	 * @param workUnit
	 * @param customType
	 * @param industry
	 * @param customState
	 * @return
	 */
	@RequestMapping(value = "findCustomerManage")
	@ResponseBody
	public List<Map<String,Object>> findCustomerManage(String workUnit, Long customType,Long industry,Long customState){
		
//		CustomerInfoBo bo = new CustomerInfoBo();
		List<Map<String,Object>> mapList = new ArrayList<Map<String,Object>>();

		List<CustomerInfo> customerList = customerInfoService.findCustomerManage(workUnit, customType, industry, customState);
		for(CustomerInfo c : customerList){
			Map<String, Object> m = new LinkedHashMap<String, Object>();
			m.put("id", c.getId());
			m.put("workUnit", c.getWorkUnit());
//			m.put("addTime", c.getAddTime());
			if(c.getAddTime() != null){
				try {
					m.put("addTime", df.format(df.parse(c.getAddTime())));
				} catch (ParseException e) {
					e.printStackTrace();
				}
			}
			m.put("address", c.getAddress());
			m.put("workPhone", c.getWorkPhone());
//			m.put("ascriptionTime", c.getAscriptionTime());
			if(c.getAscriptionTime() != null){
				try {
					m.put("ascriptionTime", df.format(df.parse(c.getAscriptionTime())));
				} catch (ParseException e) {
					e.printStackTrace();
				}
			}
			m.put("summary", c.getSummary());
			
			//根据findAllCustomer中的Id查询客户类别，及Id
			List<CustomerInfoBo> typeList=customerInfoService.findcustomTypeByid(c.getId());
			for(CustomerInfoBo typeBo : typeList){
				m.put("customTypeId", typeBo.getCustomTypeId());  
				m.put("customType", typeBo.getCustomType());  
			}
			//根据findAllCustomer中的Id查询所在城市，及Id
			List<CustomerInfoBo> cityList=customerInfoService.findcustomCityByid(c.getId());
			for(CustomerInfoBo cityBo : cityList){
				m.put("customCityId", cityBo.getCustomCityId());
				m.put("customCity", cityBo.getCustomCity());
			}
			//根据findAllCustomer中的Id查询客户行业，及Id
			List<CustomerInfoBo> industryList=customerInfoService.findindustryByid(c.getId());
			for(CustomerInfoBo industryBo : industryList){
				m.put("industryId", industryBo.getIndustryId());
				m.put("industry", industryBo.getIndustry());
			}
			//根据findAllCustomer中的Id查询客户状态，及Id
			List<CustomerInfoBo> stateList=customerInfoService.findcustomStateByid(c.getId());
			for(CustomerInfoBo stateBo : stateList){
				m.put("customStateId", stateBo.getCustomStateId());
				m.put("customState", stateBo.getCustomState());
			}	
			//根据findAllCustomer中的Id查询客户来源，及Id
			List<CustomerInfoBo> fromList=customerInfoService.findcustomFromByid(c.getId());
			for(CustomerInfoBo formBo : fromList){
				m.put("customFromId", formBo.getCustomFromId());
				m.put("customFrom", formBo.getCustomFrom());
			}
			//根据id查询所属业务员的昵称  by chendf 2017/1/9
			List<CustomerInfoBo> nickNameList=customerInfoService.findNickNameByid(c.getId());
			for(CustomerInfoBo nickNameBo : nickNameList){
				m.put("ascription", nickNameBo.getAscription());
			}
			//根据id查询增加人(addPeople)的昵称  by chendf 2017/1/9
			List<CustomerInfoBo> addPeopleList=customerInfoService.findAddPeopleByid(c.getId());
			for(CustomerInfoBo addPeopleBo : addPeopleList){
				m.put("addPeople", addPeopleBo.getAddPeople());
			}
			
			mapList.add(m);
		}
		
//		JSONArray jsonarray = JSONArray.fromObject(mapList);
		return mapList;
	}
	
	/**
	 * 客户公海的数据查询
	 * @param workUnit
	 * @param customType
	 * @param industry
	 * @param customState
	 * @return
	 */
	@RequestMapping(value = "findCustomerSea")
	@ResponseBody
	public List<Map<String,Object>> findCustomerSea(String workUnit, Long customType,Long industry,Long customState){
		
		CustomerInfoBo bo = new CustomerInfoBo();
		List<Map<String,Object>> mapList = new ArrayList<Map<String,Object>>();
//		Map<String, Object> map = new HashMap<String, Object>();
		List<CustomerInfo> customerList = customerInfoService.findCustomerSea(workUnit, customType, industry, customState);
		
		for(CustomerInfo c : customerList){
			Map<String, Object> m = new LinkedHashMap<String, Object>();
			bo.setId(c.getId());
			m.put("id", c.getId());
			m.put("workUnit", c.getWorkUnit());
//			m.put("addTime", c.getAddTime());
			if(c.getAddTime() != null){
				try {
					m.put("addTime", df.format(df.parse(c.getAddTime())));
				} catch (ParseException e) {
					e.printStackTrace();
				}
			}
			m.put("address", c.getAddress());
			m.put("workPhone", c.getWorkPhone());
//			m.put("ascriptionTime", c.getAscriptionTime());
			if(c.getAscriptionTime() != null){
				try {
					m.put("ascriptionTime", df.format(df.parse(c.getAscriptionTime())));
				} catch (ParseException e) {
					e.printStackTrace();
				}
			}
			m.put("summary", c.getSummary());
			
			//根据findAllCustomer中的Id查询客户类别，及Id
			List<CustomerInfoBo> typeList=customerInfoService.findcustomTypeByid(c.getId());
			for(CustomerInfoBo typeBo : typeList){
				m.put("customTypeId", typeBo.getCustomTypeId());  
				m.put("customType", typeBo.getCustomType());  
			}
			//根据findAllCustomer中的Id查询所在城市，及Id
			List<CustomerInfoBo> cityList=customerInfoService.findcustomCityByid(c.getId());
			for(CustomerInfoBo cityBo : cityList){
				m.put("customCityId", cityBo.getCustomCityId());
				m.put("customCity", cityBo.getCustomCity());
			}
			//根据findAllCustomer中的Id查询客户行业，及Id
			List<CustomerInfoBo> industryList=customerInfoService.findindustryByid(c.getId());
			for(CustomerInfoBo industryBo : industryList){
				m.put("industryId", industryBo.getIndustryId());
				m.put("industry", industryBo.getIndustry());
			}
			//根据findAllCustomer中的Id查询客户状态，及Id
			List<CustomerInfoBo> stateList=customerInfoService.findcustomStateByid(c.getId());
			for(CustomerInfoBo stateBo : stateList){
				m.put("customStateId", stateBo.getCustomStateId());
				m.put("customState", stateBo.getCustomState());
			}	
			//根据findAllCustomer中的Id查询客户来源，及Id
			List<CustomerInfoBo> fromList=customerInfoService.findcustomFromByid(c.getId());
			for(CustomerInfoBo formBo : fromList){
				m.put("customFromId", formBo.getCustomFromId());
				m.put("customFrom", formBo.getCustomFrom());
			}
			//根据id查询所属业务员的昵称  by chendf 2017/1/9
			List<CustomerInfoBo> nickNameList=customerInfoService.findNickNameByid(c.getId());
			for(CustomerInfoBo nickNameBo : nickNameList){
				m.put("ascription", nickNameBo.getAscription());
			}
			//根据id查询增加人(addPeople)的昵称  by chendf 2017/1/9
			List<CustomerInfoBo> addPeopleList=customerInfoService.findAddPeopleByid(c.getId());
			for(CustomerInfoBo addPeopleBo : addPeopleList){
				m.put("addPeople", addPeopleBo.getAddPeople());
			}
			mapList.add(m);
		}
		
//		JSONArray jsonarray = JSONArray.fromObject(mapList);
		return mapList;
	}
	
	/**
	 * 公司名称下拉框
	 * @return
	 */
	@RequestMapping(value = "findWorkUnit")
	@ResponseBody
	public Map<String, Object> findWorkUnit() {			
				List<CustomerInfo> list= customerInfoService.findWorkUnit();
				resultMap.put("status", 200);
				resultMap.put("successCount", list);
		return resultMap;
	}
}
	
	
	
	