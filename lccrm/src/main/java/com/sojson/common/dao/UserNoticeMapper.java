package com.sojson.common.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.sojson.common.model.UserNotice;

public interface UserNoticeMapper {

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
	
	/**
	 * 
	 * @param userId
	 * @return
	 */
	List<UserNotice> findAllUserNotice(@Param("userId") Long userId);
}
