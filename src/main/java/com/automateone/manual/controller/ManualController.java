package com.automateone.manual.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.automateone.manual.service.ManualService;
import com.automateone.manual.vo.ManualVO;


@Controller

public class ManualController {
	private Logger log = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
	ManualService manualService;
	
	@GetMapping("/test")
	public String test() throws Exception {
		return "/bs3";
	}

	@GetMapping("/main")
	public String main() throws Exception {
		return "/manual/main";
	}
	
	@GetMapping("/manualWrite")
	public String manualWrite() throws Exception {
		return "/manual/manualWrite";
	}
	
	@RequestMapping("/manualInsert")
	public @ResponseBody int manualInsert(HttpServletRequest req, HttpServletResponse res, Model model) throws Exception {
		ManualVO mVO = new ManualVO();
		
		int result = manualService.manualInsert(req, mVO);
		
		return result;
	}

	/*
	 * @GetMapping("/manualView") public String manualView() throws Exception {
	 * return "/manual/manualView"; }
	 */

	@RequestMapping("/manualView/{category}")
	public String view(@PathVariable("category") int category, Model model) throws Exception {
		int result = manualService.manualView(category);
		log.info("dd" + result);
		
		model.addAttribute(category);
		
		return "/manual/manualView";
	}
	
	
	
}
