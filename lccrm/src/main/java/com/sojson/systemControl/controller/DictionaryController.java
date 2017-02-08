package com.sojson.systemControl.controller;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.sojson.common.controller.BaseController;
import com.sojson.common.model.Dictionary;
import com.sojson.common.utils.LoggerUtils;
import com.sojson.core.mybatis.page.Pagination;
import com.sojson.systemControl.bo.DictionaryBo;
import com.sojson.systemControl.service.DictionaryService;

import net.sf.json.JSONArray;

@Controller
@Scope(value="prototype")
@RequestMapping(value = "system")
public class DictionaryController extends BaseController {

	@Autowired
	DictionaryService dictionaryService;
	
	/**
	 * 根据dicId,dicName查询字典表数据
	 * @param record
	 * @return
	 */
	@RequestMapping(value = "findDic")
	@ResponseBody
	public List<Map<String,Object>> findDic(String dicId, String dicName){
		List<Map<String,Object>> mapList = new ArrayList<Map<String,Object>>();
		List<Dictionary> dictionaryList = dictionaryService.findDic(dicId, dicName);
		for(Dictionary d : dictionaryList){
			Map<String, Object> m = new LinkedHashMap<String, Object>();
			Long higherId = d.getHigherId();
			Long id = d.getId();
			m.put("id", id);
			m.put("dicId", d.getDicId());
			m.put("higherId", higherId);
			m.put("dicName", d.getDicName());
			m.put("dicTitle", d.getDicTitle());
			m.put("orderNum", d.getOrderNum());
			
			if(higherId != null){
				List<DictionaryBo> list = dictionaryService.findByHigherId(higherId, id);
				for(DictionaryBo dic : list){
					m.put("higherDicId", dic.getHigherDicId());
					m.put("higherDicTitle", dic.getHigherDicTitle());
				}
			}
			mapList.add(m);
		}
//		JSONArray jsonarray = JSONArray.fromObject(dictionaryList);
		return mapList;
	}
	
	/**
	 * 分页查询字典表的全部数据
	 * @param findContent
	 * @param modelMap
	 * @param pageNo
	 * @return
	 */
	@RequestMapping(value="list")
	public ModelAndView index(String findContent,ModelMap modelMap,Integer pageNo){
		modelMap.put("findContent", findContent);
		Pagination<Dictionary> dictionary = dictionaryService.findPage(modelMap,pageNo,pageSize);
		return new ModelAndView("system/dictionary","page",dictionary);
	}
	
	/**
	 * 跳转到字典页面
	 * @return
	 */
	@RequestMapping(value="list",method=RequestMethod.GET)
	public ModelAndView dictionary(){
		return new ModelAndView("system/dictionary");
	}
	
	/**
	 * 根据主键删除字典表数据,如果有多个，以“,”间隔。
	 * @param ids
	 * @return
	 */
	@RequestMapping(value = "deleteDictionaryById",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> deleteDictionaryById(String ids){
		return dictionaryService.deleteDictionaryById(ids);
	}
	
	/**
	 * 新增字典数据
	 * @param record
	 * @return
	 */
	@RequestMapping(value = "addDictionary",method=RequestMethod.POST)
	@ResponseBody
	public Map<String,Object> addDictionary(Dictionary record, String higherDicId, String higherDicTitle){
		try {
			if(higherDicId != "" && higherDicTitle != ""){
				Long higherId = dictionaryService.findPrimaryKey(higherDicId, higherDicTitle);
				record.setHigherId(higherId);
			}
			int count = dictionaryService.insertSelective(record);
			resultMap.put("status", 200);
			resultMap.put("successCount", count);
		} catch (Exception e) {
			resultMap.put("status", 500);
			resultMap.put("message", "添加失败，请刷新后再试！");
			LoggerUtils.fmtError(getClass(), e, "新增字典报错。source[%s]",record.toString());
		}
		return resultMap;
	}
	
	/**
	 * 修改字典表
	 * @param record
	 * @return
	 */
	@RequestMapping(value = "update",method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> updateByPrimaryKeySelective(Dictionary record, String higherDicId, String higherDicTitle){
		try {
			if(higherDicId != "" && higherDicTitle != ""){
				Long higherId = dictionaryService.findPrimaryKey(higherDicId, higherDicTitle);
				record.setHigherId(higherId);
			}
			int count = dictionaryService.updateByPrimaryKeySelective(record);
			resultMap.put("status", 200);
			resultMap.put("successCount", count);
		} catch (Exception e) {
			resultMap.put("status", 500);
			resultMap.put("message", "修改失败，请刷新后再试！");
			LoggerUtils.fmtError(getClass(), e, "修改字典报错。source[%s]",record.toString());
		}
		return resultMap;
	}
	
	/**
	 * 二级联动，查询dicId
	 * @param dicId
	 * @return
	 */
	@RequestMapping(value = "findAllDicId",method=RequestMethod.POST)
	@ResponseBody
	public List<String> findAllDicId(String dicId) {		
		List<String> list = dictionaryService.findAllDicId(dicId);
		JSONArray jsonarray = JSONArray.fromObject(list);
		return jsonarray;
	}
	
	/**
	 * 二级联动，查询dicTitle
	 * @param dicId
	 * @return
	 */
	@RequestMapping(value = "findAllDicTitle")
	@ResponseBody
	public List<String> findAllDicTitle(String dicId) {
		List<String> list = dictionaryService.findAllDicTitle(dicId);
		JSONArray jsonarray = JSONArray.fromObject(list);
		return list;
	}
	
}
