/*******************************************************************************
 * Copyright 2012 Just-Cloud
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ******************************************************************************/
package com.justcloud.osgifier.service;

import java.io.InputStream;
import java.util.Collection;

import org.osgi.framework.BundleException;

import com.justcloud.osgifier.dto.BundleAdapter;

public interface BundleService extends Service {

	public Collection<BundleAdapter> getBundles();

	public void startBundle(Long id) throws BundleException;

	public void stopBundle(Long id) throws BundleException;

	public void uninstallBundle(Long id) throws BundleException;

	public void installPackage(String pack) throws BundleException;
	
	public void installBundle(String location) throws BundleException;

	public void installBundle(String location, InputStream is) throws BundleException;

	public void restartBundle(Long id) throws BundleException;

	public void updateBundle(Long id) throws BundleException;

	public void updateBundle(Long id, InputStream is) throws BundleException;

}
