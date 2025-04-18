// Copyright (c) 2022-2025 Contributors to the Eclipse Foundation
//
// This program and the accompanying materials are made available under the
// terms of the Apache License, Version 2.0 which is available at
// https://www.apache.org/licenses/LICENSE-2.0.
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations
// under the License.
//
// SPDX-License-Identifier: Apache-2.0

import * as os from 'node:os';
import { cwd } from 'node:process';
import { ProjectCache } from '../../src/modules/project-cache';
import { CliFileSystem, MockFileSystem, MockFileSystemObj } from '../../src/utils/fs-bridge';
import {
    appManifestMock,
    corePackageInfoMock,
    corePackageManifestMock,
    mockCacheContent,
    packageIndexMock,
    runtimePackageInfoMock,
    runtimePackageManifestMock,
    setupPackageInfoMock,
    setupPackageManifestMock,
    velocitasConfigLockMock,
    velocitasConfigMock,
} from './mockConfig';

export const userHomeDir = os.homedir();

const runtimePackagePath = `${userHomeDir}/.velocitas/packages/${runtimePackageInfoMock.repo}/${runtimePackageInfoMock.resolvedVersion}`;
const setupPackagePath = `${userHomeDir}/.velocitas/packages/${setupPackageInfoMock.repo}/${setupPackageInfoMock.resolvedVersion}`;
const corePackagePath = `${userHomeDir}/.velocitas/packages/${corePackageInfoMock.repo}/${setupPackageInfoMock.resolvedVersion}`;

const velocitasConfig = `${cwd()}/.velocitas.json`;
const velocitasConfigLock = `${cwd()}/.velocitas-lock.json`;
const appManifestPath = `${cwd()}/app/AppManifest.json`;
const cacheConfig = `${ProjectCache.getCacheDir()}/cache.json`;
const packageIndex = `${cwd()}/package-index.json`;
const runtimePackagePathManifest = `${runtimePackagePath}/manifest.json`;
const setupPackagePathManifest = `${setupPackagePath}/manifest.json`;
const corePackagePathManifest = `${corePackagePath}/manifest.json`;

type MockConfig = {
    velocitasConfig?: boolean;
    velocitasConfigLock?: boolean;
    installedComponents?: boolean;
    appManifest?: boolean;
    packageIndex?: boolean;
};

export const mockFolders = (mockConfig?: MockConfig) => {
    let fileSystemObj: MockFileSystemObj = {};

    if (mockConfig) {
        fileSystemObj[cacheConfig] = JSON.stringify(mockCacheContent);
    }
    if (mockConfig && mockConfig.velocitasConfig) {
        fileSystemObj[velocitasConfig] = JSON.stringify(velocitasConfigMock);
    }
    if (mockConfig && mockConfig.velocitasConfigLock) {
        fileSystemObj[velocitasConfigLock] = JSON.stringify(velocitasConfigLockMock);
    }
    if (mockConfig && mockConfig.packageIndex) {
        fileSystemObj[packageIndex] = JSON.stringify(packageIndexMock);
    }
    if (mockConfig && mockConfig.appManifest !== false) {
        fileSystemObj[appManifestPath] = JSON.stringify(appManifestMock);
    }
    if (mockConfig && mockConfig.installedComponents) {
        fileSystemObj[runtimePackagePathManifest] = JSON.stringify(runtimePackageManifestMock);
        fileSystemObj[setupPackagePathManifest] = JSON.stringify(setupPackageManifestMock);
        fileSystemObj[corePackagePathManifest] = JSON.stringify(corePackageManifestMock);
    }

    CliFileSystem.setImpl(new MockFileSystem(fileSystemObj));
};
