package com.sojson.notice.service;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.sojson.common.model.Notice;
import com.sojson.common.model.UserNotice;

public interface NoticeService {

	/**
	 * 根据标题查询所有公告
	 * @param title
	 * @return
	 */
	List<Notice>findAll(@Param("title") String title);
	
	/**
	 * 根据用户Id查询数据
	 * @param userId
	 * @return
	 */
	List<Notice> findNotice(@Param("userId") Long userId);
	
	/**
	 * 删除公告
	 * @param id
	 * @return
	 */
    int deleteByPrimaryKey(@Param("id") Long id);
    
    /**
     * 删除多个公告
     * @param ids
     * @return
     */
    Map<String, Object> deleteNoticeById(String ids);
    
    /**
	 * 更新推送状态
	 * @param record
	 * @return
	 */
	int updateNoticeByPrimaryKey(Notice record);
  
	/**
	 * 新增公告
	 * @param record
	 * @return
	 */
	int insertSelective(Notice record);
	
	/**
	 * 新增
	 * @param record
	 * @return
	 */
	int insertUserNotice(UserNotice record);
	
	/**
	 * 查询未读总数 
	 * @param userId
	 * @return
	 */
	int selectCount(@Param("userId") Long userId);
	
	/**
	 * 修改阅读状态
	 * @param record
	 * @return
	 */
	int updateUserNoticeByPrimaryKey(UserNotice record);
	
	/**
	 * 删除
	 * @param id
	 * @return
	 */
	int deleteUserNoticeByPrimaryKey(@Param("id") Long id);
}
