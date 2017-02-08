package com.sojson.notice.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sojson.common.dao.CustomerInfoMapper;
import com.sojson.common.dao.NoticeMapper;
import com.sojson.common.dao.UserNoticeMapper;
import com.sojson.common.model.Notice;
import com.sojson.common.model.UserNotice;
import com.sojson.common.utils.LoggerUtils;
import com.sojson.core.mybatis.BaseMybatisDao;
import com.sojson.notice.service.NoticeService;

@Service
public class NoticeServiceImpl extends BaseMybatisDao<CustomerInfoMapper> implements NoticeService{

	@Autowired
	NoticeMapper noticeMapper;
	@Autowired
	UserNoticeMapper userNoticeMapper;
	
	/**
	 * 根据标题查询所有公告
	 */
	@Override
	public List<Notice> findAll(String title) {
		return noticeMapper.findAll(title);
	}

	/**
	 * 根据用户Id查询数据
	 */
	@Override
	public List<Notice> findNotice(Long userId) {
		return noticeMapper.findNotice(userId);
	}
	
	/**
	 * 删除公告
	 */
	@Override
	public int deleteByPrimaryKey(Long id) {
		return noticeMapper.deleteByPrimaryKey(id);
	}
	
	/**
	 * 根据id删除公告,如果有多个，以“,”间隔。
	 */
	@Override
	public Map<String, Object> deleteNoticeById(String ids) {
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
				count+=this.deleteByPrimaryKey(new Long(id));
			}
			resultMap.put("status", 200);
			resultMap.put("count", count);
		} catch (Exception e) {
			LoggerUtils.fmtError(getClass(), e, "根据IDS删除公告出现错误，ids[%s]", ids);
			resultMap.put("status", 500);
			resultMap.put("message", "删除出现错误，请刷新后再试！");
		}
		return resultMap;
	}

	/**
	 * 更新推送状态
	 */
	@Override
	public int updateNoticeByPrimaryKey(Notice record) {
		return noticeMapper.updateNoticeByPrimaryKey(record);
	}
	
	/**
	 * 新增公告
	 */
	@Override
	public int insertSelective(Notice record) {
		return noticeMapper.insertSelective(record);
	}

	/**
	 * 新增userNotice
	 */
	@Override
	public int insertUserNotice(UserNotice record) {
		return userNoticeMapper.insertUserNotice(record);
	}

	/**
	 * 查询未读总数 
	 */
	@Override
	public int selectCount(Long userId) {
		return userNoticeMapper.selectCount(userId);
	}

	/**
	 * 修改阅读状态
	 */
	@Override
	public int updateUserNoticeByPrimaryKey(UserNotice record) {
		return userNoticeMapper.updateUserNoticeByPrimaryKey(record);
	}

	/**
	 * 删除userNotice
	 */
	@Override
	public int deleteUserNoticeByPrimaryKey(Long id) {
		return userNoticeMapper.deleteUserNoticeByPrimaryKey(id);
	}

}
