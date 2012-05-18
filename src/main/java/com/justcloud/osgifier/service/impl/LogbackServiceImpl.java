package com.justcloud.osgifier.service.impl;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import ch.qos.logback.classic.LoggerContext;
import ch.qos.logback.classic.joran.JoranConfigurator;

import com.justcloud.osgifier.service.LogbackService;
import com.justcloud.osgifier.service.UtilsService;

public class LogbackServiceImpl implements LogbackService {

	private static final Object NEWLINE = "\n";
	private Logger logger = LoggerFactory.getLogger(LogbackServiceImpl.class);

	@Override
	public String getConfiguration() {
		StringBuffer result = new StringBuffer();
		BufferedReader reader = null;
		try {
			reader = new BufferedReader(new FileReader(
					getConfigurationFile()));
			String line;
			while ((line = reader.readLine()) != null) {
				result.append(line);
				result.append(NEWLINE);
			}
		} catch (Exception e) {
			logger.error("Cannot load logback configuration", e);
		} finally {
			if(reader != null) {
				try {
					reader.close();
				} catch (IOException e) {
					logger.error("Cannot close logback configuration", e);
				}
			}
		}
		return result.toString();
	}

	@Override
	public void loadConfiguration(String configuration) {
		JoranConfigurator configurator = new JoranConfigurator();
		LoggerContext context = (LoggerContext) LoggerFactory
				.getILoggerFactory();

		configurator.setContext(context);
		context.reset();

		InputStream is = new ByteArrayInputStream(configuration.getBytes());

		try {
			configurator.doConfigure(is);
			
			writeConfiguration(configuration);
			
		} catch (Exception e) {
			throw new RuntimeException(e);
		}

	}

	@Override
	public void reloadConfiguration() {
		loadConfiguration(getConfiguration());
	}

	private File getConfigurationFile() {
		File parent = new File(UtilsService.getPath("/logback"));
		if (!parent.exists()) {
			parent.mkdirs();
		}
		return new File(parent, "configuration.xml");
	}

	private void writeConfiguration(String configuration) throws IOException {
		BufferedWriter writer = new BufferedWriter(new FileWriter(
				getConfigurationFile()));
		
		try {
			writer.write(configuration);
		} finally {
			if(writer != null) {
				writer.close();
			}
		}
		
	}

	@Override
	public String getName() {
		return "Logback";
	}

}
