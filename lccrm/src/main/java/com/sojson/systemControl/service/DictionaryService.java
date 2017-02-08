package com.sojson.systemControl.service;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.sojson.common.model.Dictionary;
import com.sojson.core.mybatis.page.Pagination;
import com.sojson.systemControl.bo.DictionaryBo;

public interface DictionaryService {

	/**
	 * 分页查询字典表的全部数据
	 * @param resultMap
	 * @param pageNo
	 * @param pageSize
	 * @return
	 */
	Pagination<Dictionary> findPage(Map<String,Object> resultMap, Integer pageNo, Integer pageSize);
	
	/**
	 * 根据主键删除字典表数据
	 * @param id
	 * @return
	 */
	int deleteByPrimaryKey(Long id);
	
	/**
	 * 根据主键删除字典表数据,如果有多个，以“,”间隔。
	 * @param ids
	 * @return
	 */
	Map<String, Object> deleteDictionaryById(String ids);
	
	/**
	 * 新增字典数据
	 * @param record
	 * @return
	 */
	int insertSelective(Dictionary record);
	
	/**
	 * 修改字典表
	 * @param record
	 * @return
	 */
	int updateByPrimaryKeySelective(Dictionary record);
	
	/**
	 * 根据dicId,dicName查询字典表数据
	 * @param record
	 * @return
	 */
	List<Dictionary> findDic(String dicId, String dicName);
	
	/**
	 * 查询dicId
	 * @param dicId
	 * @return
	 */
	List<String> findAllDicId(@Param("dicId")String dicId);
	
	/**
	 * 查询dicTitle
	 * @param dicId
	 * @return
	 */
	List<String> findAllDicTitle(@Param("dicId")String dicId);
	
	/**
	 * 查询dicId的主键
	 * @param higherDicId
	 * @param higherDicTitle
	 * @return
	 */
	Long findPrimaryKey(@Param("higherDicId")String higherDicId, @Param("higherDicTitle")String higherDicTitle);

	/**
	 * 根据higherId查询dicId,dicTitle 
	 * @param higherId
	 * @param id
	 * @return
	 */
	List<DictionaryBo> findByHigherId(@Param("higherId")Long higherId, @Param("id")Long id);

}