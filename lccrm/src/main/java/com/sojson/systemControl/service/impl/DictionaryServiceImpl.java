package com.sojson.systemControl.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sojson.common.dao.DictionaryMapper;
import com.sojson.common.model.Dictionary;
import com.sojson.common.utils.LoggerUtils;
import com.sojson.core.mybatis.BaseMybatisDao;
import com.sojson.core.mybatis.page.Pagination;
import com.sojson.systemControl.bo.DictionaryBo;
import com.sojson.systemControl.service.DictionaryService;

@Service
public class DictionaryServiceImpl extends BaseMybatisDao<DictionaryMapper> implements DictionaryService{

	@Autowired
	DictionaryMapper dictionaryMapper;
	
	/**
	 * 分页查询字典表的全部数据
	 */
	@SuppressWarnings("unchecked")
	@Override
	public Pagination<Dictionary> findPage(Map<String, Object> resultMap, Integer pageNo, Integer pageSize) {
		return super.findPage(resultMap, pageNo, pageSize);
	}

	/**
	 * 根据主键删除字典表数据
	 */
	@Override
	public int deleteByPrimaryKey(Long id) {
		return dictionaryMapper.deleteByPrimaryKey(id);
	}

	/**
	 * 根据主键删除字典表数据,如果有多个，以“,”间隔。
	 */
	@Override
	public Map<String, Object> deleteDictionaryById(String ids) {
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
			LoggerUtils.fmtError(getClass(), e, "根据IDS删除用户出现错误，ids[%s]", ids);
			resultMap.put("status", 500);
			resultMap.put("message", "删除出现错误，请刷新后再试！");
		}
		return resultMap;
	}

	/**
	 * 新增字典数据
	 * @param record
	 * @return
	 */
	@Override
	public int insertSelective(Dictionary record) {

		//新增字典数据中，若dicId不存在返回1，不存在返回0
		int msg = 1;

        //判断重复
        if (true) {
            List<String> list  = dictionaryMapper.findAllDicId("");
            int n = 0;
            for (String b : list) {
                if (record.getDicId().equals(b)) {
                    n++;
                    msg = 0;//不存在返回0
                }
            }
            if (n > 0) {
                return msg;
            }
        }
		return dictionaryMapper.insertSelective(record);
	}
	
	/**
	 * 修改字典表
	 * @param record
	 * @return
	 */
	public int updateByPrimaryKeySelective(Dictionary record){
		return dictionaryMapper.updateByPrimaryKeySelective(record);
	}

	/**
	 * 根据dicId,dicName查询字典表数据
	 * @param record
	 * @return
	 */
	@Override
	public List<Dictionary> findDic(String dicId, String dicName) {
//		Map<String,Object> map = new HashMap<String,Object>();
//		map.put("dicId", record.getDicId());
//		map.put("dicName", record.getDicName());
		return dictionaryMapper.findDic(dicId, dicName);
	}

	/**
	 * 查询dicId
	 */
	@Override
	public List<String> findAllDicId(String dicId) {
		return dictionaryMapper.findAllDicId(dicId);
	}

	/**
	 * 查询dicTitle
	 */
	@Override
	public List<String> findAllDicTitle(String dicId) {
		return dictionaryMapper.findAllDicTitle(dicId);
	}

	/**
	 * 查询dicId的主键
	 */
	@Override
	public Long findPrimaryKey(String higherDicId, String higherDicTitle) {
		return dictionaryMapper.findPrimaryKey(higherDicId, higherDicTitle);
	}
	
	/**
	 * 根据higherId查询dicId,dicTitle 
	 */
	@Override
	public List<DictionaryBo> findByHigherId(Long higherId, Long id) {
		return dictionaryMapper.findByHigherId(higherId, id);
	}
	
}
