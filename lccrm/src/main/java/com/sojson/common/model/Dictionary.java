package com.sojson.common.model;

import java.io.Serializable;

import net.sf.json.JSONObject;

/**
 * 字典表
 * @author chendf
 *
 */
public class Dictionary implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private Long id;//自增长列
	
	private String dicId;//字典Id
	
	private Long higherId;//上级Id
	
	private String dicName;//字典名称
	
	private String dicTitle;//字典内容
	
	private Integer orderNum;//内容序号

	public Long getHigherId() {
		return higherId;
	}

	public void setHigherId(Long higherId) {
		this.higherId = higherId;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDicId() {
		return dicId;
	}

	public void setDicId(String dicId) {
		this.dicId = dicId;
	}

	public String getDicName() {
		return dicName;
	}

	public void setDicName(String dicName) {
		this.dicName = dicName;
	}

	public String getDicTitle() {
		return dicTitle;
	}

	public void setDicTitle(String dicTitle) {
		this.dicTitle = dicTitle;
	}

	public Integer getOrderNum() {
		return orderNum;
	}

	public void setOrderNum(Integer orderNum) {
		this.orderNum = orderNum;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
}
