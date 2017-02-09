package com.sojson.customerTrack.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sojson.common.controller.BaseController;
import com.sojson.common.model.CustomerTrack;
import com.sojson.common.utils.LoggerUtils;
import com.sojson.core.shiro.token.manager.TokenManager;
import com.sojson.customerTrack.bo.CustomerTrackBo;
import com.sojson.customerTrack.service.CustomerTrackService;

@Controller
@Scope(value = "prototype")
@RequestMapping(value = "cstrack")
public class CustomerTrackController extends BaseController {

	@Autowired
	CustomerTrackService customerTrackService;

	private SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");

	/**
	 * 员工信息模块，查询employeeInfo表所有数据 by yangs 2017/1/9
	 * 
	 * @param
	 * @param
	 * @param
	 * @return
	 */
	@RequestMapping(value = "findCustomerTrack")
	@ResponseBody
	public List<Map<String, Object>> findCustomerTrack(String customId, String ascription,String createStartTime,String createEndTime) {

		CustomerTrackBo bo = new CustomerTrackBo();
		List<Map<String, Object>> mapList = new ArrayList<Map<String, Object>>();
		List<CustomerTrack> employeeList = customerTrackService.findCustomerTrack(customId, ascription, createStartTime, createEndTime);

		for (CustomerTrack c : employeeList) {
			Map<String, Object> m = new LinkedHashMap<String, Object>();
			m.put("id", c.getId());
			// m.put("ascription", c.getAscription());
//			m.put("recordTime", c.getRecordTime());
			if(c.getRecordTime() != null){
				m.put("recordTime", df.format(c.getRecordTime()));
			}
			
			m.put("trackContent", c.getTrackContent());
			m.put("trackFile", c.getTrackFile());
			m.put("nextTrackDate", c.getNextTrackDate());
			m.put("nextComtent", c.getNextComtent());
			m.put("reminderDate", c.getReminderDate());

			// 根据Id查询联系人
			List<CustomerTrackBo> contactIdList = customerTrackService.findContacById(c.getId());
			for (CustomerTrackBo contactIdBo : contactIdList) {
				bo.setContactId(contactIdBo.getContactId());
				bo.setLinkMan(contactIdBo.getLinkMan());
				m.put("contactId", bo.getLinkMan());
			}
			// 根据id查询公司名称
			List<CustomerTrackBo> workUnitList = customerTrackService.findworkUnitById(c.getId());
			for (CustomerTrackBo contactIdBo : workUnitList) {
				bo.setCustomId(contactIdBo.getCustomId());
				bo.setWorkUnit(contactIdBo.getWorkUnit());
				m.put("workUnit", bo.getWorkUnit());
				m.put("customId", bo.getCustomId());
			}
			// 根据id查询跟进人(ascription)的昵称 by chendf 2017/1/20
			List<CustomerTrackBo> ascriptionList = customerTrackService.findAscriptionByid(c.getId());
			for (CustomerTrackBo contactIdBo : ascriptionList) {
				m.put("ascription", contactIdBo.getAscription());
			}
			mapList.add(m);
		}
		return mapList;
	}

	/**
	 * 根据customId查询跟进内容 by yangs 2017/1/9
	 * 
	 * @return
	 */
	@RequestMapping(value = "findTrackBycustomId")
	@ResponseBody
	public List<Map<String, Object>> findTrackBycustomId(String customId) {

		CustomerTrackBo bo = new CustomerTrackBo();
		List<Map<String, Object>> mapList = new ArrayList<Map<String, Object>>();
		List<CustomerTrackBo> employeeList = customerTrackService.findTrackBycustomId(customId);

		for (CustomerTrackBo c : employeeList) {
			Map<String, Object> m = new LinkedHashMap<String, Object>();
			m.put("recordTime", c.getRecordTime());
			m.put("trackContent", c.getTrackContent());
			m.put("trackFile", c.getTrackFile());
			m.put("nextTrackDate", c.getNextTrackDate());
			m.put("nextComtent", c.getNextComtent());
			m.put("reminderDate", c.getReminderDate());
			mapList.add(m);
		}
		return mapList;
	}

	/**
	 * 新增跟进记录
	 * 
	 * @param record
	 * @return
	 */
	@RequestMapping(value = "addTrack")
	@ResponseBody
	public Map<String, Object> addTrack(CustomerTrackBo record) {
		System.out.println("11111111111111:" + record);
		try {
			// 获取当前登录帐号为email
			String email = TokenManager.getToken().getEmail();
			if (record.getAscription() == "") {
				record.setAscription(email);
			}
			String getNextTrackDate = record.getNextTrackDate();
			if (getNextTrackDate != "") {
				String nextTrackDate = getNextTrackDate.substring(0, 4) + getNextTrackDate.substring(5, 7)
						+ getNextTrackDate.substring(8, 10);
				record.setNextTrackDate(nextTrackDate);
			}
			int count = customerTrackService.addTrack(record);
			resultMap.put("status", 200);
			resultMap.put("successCount", count);
		} catch (Exception e) {
			resultMap.put("status", 500);
			resultMap.put("message", "新增跟进记录出错，请刷新后再试！");

			LoggerUtils.fmtError(getClass(), e, "新增跟进记录报错。source[%s]", record.toString());
		}
		return resultMap;
	}

	/**
	 * 获取联系人信息
	 * 
	 * @param record
	 * @return
	 */
	@RequestMapping(value = "findContactInfo")
	@ResponseBody
	public Map<String, Object> findContactInfo(String linkMan) {
		try {
			List<CustomerTrackBo> count = customerTrackService.findContactInfo(linkMan);
			resultMap.put("status", 200);
			resultMap.put("successCount", count);
		} catch (Exception e) {
			resultMap.put("status", 500);
			resultMap.put("message", "获取联系人信息失败，请刷新后再试！");

			LoggerUtils.fmtError(getClass(), e, "获取联系人信息报错。source[%s]");
		}
		return resultMap;
	}

	/**
	 * 根据主键删跟进记录表数据,如果有多个，以“,”间隔。
	 * 
	 * @param ids
	 * @return
	 */
	@RequestMapping(value = "deleteTrackById")
	@ResponseBody
	public Map<String, Object> deleteTrackById(String ids) {
		return customerTrackService.deleteTrackById(ids);
	}

}
