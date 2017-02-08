package com.sojson.common.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.sojson.common.model.Notice;

public interface NoticeMapper {

	/**
	 * 根据标题查询所有公告
	 * @param title
	 * @return
	 */
	List<Notice> findAll(@Param("title") String title);
	
	/**
	 * 删除公告
	 * @param id
	 * @return
	 */
    int deleteByPrimaryKey(@Param("id") Long id);
  
	/**
	 * 新增公告
	 * @param record
	 * @return
	 */
	int insertSelective(Notice record);
	
	/**
	 * 根据用户Id查询数据
	 * @param userId
	 * @return
	 */
	List<Notice> findNotice(@Param("userId") Long userId);
	
	/**
	 * 更新推送状态
	 * @param record
	 * @return
	 */
	int updateNoticeByPrimaryKey(Notice record);
	
}
