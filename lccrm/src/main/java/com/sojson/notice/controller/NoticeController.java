package com.sojson.notice.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sojson.common.controller.BaseController;
import com.sojson.common.model.Notice;
import com.sojson.common.model.UUser;
import com.sojson.common.model.UserNotice;
import com.sojson.common.utils.LoggerUtils;
import com.sojson.core.shiro.token.manager.TokenManager;
import com.sojson.notice.service.NoticeService;
import com.sojson.user.service.UUserService;

@Controller
@Scope(value="prototype")
@RequestMapping(value = "notice")
public class NoticeController extends BaseController {

	@Autowired
	NoticeService noticeService;
	@Autowired
	UUserService userService;
	
	private SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	
	/**
	 * 根据标题查询所有公告
	 * @param title
	 * @return
	 */
	@RequestMapping(value = "findAll")
	@ResponseBody
	public Map<String, Object> findAll(String title){
		try {
			List<Map<String,Object>> mapList = new ArrayList<Map<String,Object>>();
			List<Notice> list = noticeService.findAll(title);
			for(Notice n : list){
				Map<String, Object> m = new LinkedHashMap<String, Object>();
				m.put("id", n.getId());
				m.put("title", n.getTitle());
				m.put("content", n.getContent());
				m.put("publisher", n.getPublisher());
				if(n.getPublishTime() != null){
					try {
						m.put("publishTime", df.format(df.parse(n.getPublishTime())));
					} catch (ParseException e) {
						e.printStackTrace();
					}
				}
				m.put("isPush", n.getIsPush());
				mapList.add(m);
			}	
			resultMap.put("status", 200);
			resultMap.put("success", mapList);
		} catch (Exception e) {
			resultMap.put("status", 500);
			resultMap.put("message", "查询失败！");
			e.printStackTrace();
		}
		return resultMap;
	}
	
	/**
	 * 删除公告
	 * @param ids
	 * @return
	 */
	@RequestMapping(value = "deleteNoticeById")
	@ResponseBody
	public Map<String, Object> deleteNoticeById(String ids) {
		return noticeService.deleteNoticeById(ids);
	}
	
	/**
	 * 新增公告,同时想各员工发布公告
	 * @param record
	 * @return
	 */
	@RequestMapping(value = "insertSelective")
	@ResponseBody
	public Map<String, Object> insertSelective(Notice record, String userIds){
		try {
			//获取当前登录帐号为email
			String email = TokenManager.getToken().getEmail();
			record.setPublisher(email);
			int count = noticeService.insertSelective(record);
			
			Map<String,Object> resultMap = new HashMap<String,Object>();
			UserNotice userNotice = new UserNotice();
			Long noticeId = record.getId();
			int push = 0;
			if(noticeId != null){
				String[] userIdArray = new String[]{};
				if(StringUtils.contains(userIds, ",")){
					userIdArray = userIds.split(",");
				}else{
					userIdArray = new String[]{userIds};
				}
				for (String userId : userIdArray) {
					userNotice.setNoticeId(noticeId);
					userNotice.setUserId(new Long(userId));
					push += noticeService.insertUserNotice(userNotice);
				}
			}
			
			resultMap.put("status", 200);
			resultMap.put("successcount", count);
			resultMap.put("successpush", push);
		} catch (Exception e) {
			resultMap.put("status", 500);
			resultMap.put("message", "新增公告失败，请刷新后再试！");
			LoggerUtils.fmtError(getClass(), e, "新增公告报错。source[%s]",record.toString());
			e.printStackTrace();
		}
		
		return resultMap;
	}
	
	/**
	 * 查询未读总数 
	 * @return
	 */
	@RequestMapping(value = "selectCount")
	@ResponseBody
	public Map<String, Object> selectCount(){
		try {
			//获取当前登录帐号为email
			String email = TokenManager.getToken().getEmail();
			UUser user = userService.findUserByEmail(email);
			Long userId = user.getId();
			int count = noticeService.selectCount(userId);
			resultMap.put("status", 200);
			resultMap.put("success", count);
		} catch (Exception e) {
			resultMap.put("status", 500);
			resultMap.put("message", "查询失败，请刷新后再试！");
			e.printStackTrace();
		}
		return resultMap;
	}
	
	/**
	 * 根据用户Id查询数据
	 * @return
	 */
	@RequestMapping(value = "findNotice")
	@ResponseBody
	public Map<String, Object> findNotice(){
		try {
			//获取当前登录帐号为email
			String email = TokenManager.getToken().getEmail();
			UUser user = userService.findUserByEmail(email);
			Long userId = user.getId();
			List<Notice> list = noticeService.findNotice(userId);
			resultMap.put("status", 200);
			resultMap.put("successNotice", list);
		} catch (Exception e) {
			resultMap.put("status", 500);
			resultMap.put("message", "查询失败，请刷新后再试！");
			e.printStackTrace();
		}
		return resultMap;
	}
	
	/**
	 * 更新推送状态
	 * @param record
	 * @return
	 */
	@RequestMapping(value = "updateIsPush")
	@ResponseBody
	public Map<String, Object> updateNoticeByPrimaryKey(Notice record){
		try {
			int count = noticeService.updateNoticeByPrimaryKey(record);
			resultMap.put("status", 200);
			resultMap.put("success", count);
		} catch (Exception e) {
			resultMap.put("status", 500);
			resultMap.put("message", "系统出错，请刷新后再试！");
			LoggerUtils.fmtError(getClass(), e, "更新推送状态报错。source[%s]",record.toString());
			e.printStackTrace();
		}
		return resultMap;
	}
	
	/**
	 * 更新消息阅读状态
	 * @param record
	 * @return
	 */
	@RequestMapping(value = "updateIsRead")
	@ResponseBody
	public Map<String, Object> updateUserNoticeByPrimaryKey(UserNotice record){
		try {
			int count = noticeService.updateUserNoticeByPrimaryKey(record);
			resultMap.put("status", 200);
			resultMap.put("success", count);
		} catch (Exception e) {
			resultMap.put("status", 500);
			resultMap.put("message", "系统出错，请刷新后再试！");
			LoggerUtils.fmtError(getClass(), e, "更新阅读状态报错。source[%s]",record.toString());
			e.printStackTrace();
		}
		return resultMap;
	}
	
	/**
	 * 删除公告
	 * @param ids
	 * @return
	 */
	@RequestMapping(value = "deleteUserNotice")
	@ResponseBody
	public Map<String, Object> deleteUserNoticeByPrimaryKey(Long id) {
		try {
			int count = noticeService.deleteUserNoticeByPrimaryKey(id);
			resultMap.put("status", 200);
			resultMap.put("success", count);
		} catch (Exception e) {
			resultMap.put("status", 500);
			resultMap.put("message", "系统出错，请刷新后再试！");
			LoggerUtils.fmtError(getClass(), e, "删除报错。source[%s]");
			e.printStackTrace();
		}
		return resultMap;
	}
	
}
