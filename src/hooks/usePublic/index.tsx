"use client";

import { useEffect, useState } from "react";
import { usePublicStore } from "@/store";
import { Item } from "@/types/ui";
import useApiError from "../useApiError";
import { PublicService } from "@/services/public";
import { getAllItemOption, getParentIdsByTreeData } from "@/utils/shared";
import { MenuTree } from "@/types/model-extension";

const usePublic = () => {
  const { onHandleError } = useApiError();

  const roles = usePublicStore(state => state.roles);
  const systems = usePublicStore(state => state.systems);
  const codes = usePublicStore(state => state.codes);
  const programMenus = usePublicStore(state => state.programMenus);
  const isLoadedNav = usePublicStore(state => state.isLoadedNav);

  const [roleItems, setRoleItems] = useState<Item[]>([]);
  const [systemItems, setSystemItems] = useState<Item[]>([]);
  const [codeItems, setCodesItems] = useState<Item[]>([]);

  const setRoles = usePublicStore(state => state.setRoles);
  const setSystems = usePublicStore(state => state.setSystems);
  const setCodes = usePublicStore(state => state.setCodes);
  const setProgramMenus = usePublicStore(state => state.setProgramMenus);
  const setIsLoadedNav = usePublicStore(state => state.setIsLoadedNav);

  // TODO: 권한에 맞는 system 불러오는지 확인
  const loadSystems = async () => {
    try {
      let res: any;
      if (res.data) {
        setSystems(res.data);
      }
    } catch (e) {
      console.error(e);
      onHandleError(e as any, { message: "시스템 불러오기 실패" });
    }
  };

  const loadCodes = async () => {
    try {
      let data;
      // const data = await PublicService.getCodeGroups();
      if (data) {
        setCodes(data);
      }
    } catch (e) {
      console.error(e);
      onHandleError(e as any, { message: "코드 불러오기 실패" });
    }
  };

  const loadProgramMenus = async () => {
    try {
      setIsLoadedNav(false);
      const res = await PublicService.getMenus("S000");
      if (res.data) {
        const parentIds = getParentIdsByTreeData(res.data as MenuTree[], "menuId");
        setProgramMenus(res.data);
      }
    } catch (e) {
      console.error(e);
      onHandleError(e as any, { message: "프로그램 메뉴 불러오기 실패" });
    } finally {
      setIsLoadedNav(true);
    }
  };

  //중복값 제거
  const deDupe = (data: Item[]) => {
    const list_: Item[] = [];
    data.forEach(element => {
      const isDuplicate = list_.some(
        item => item.label === element.label && item.value === element.value,
      );

      if (!isDuplicate) {
        list_.push(element);
      }
    });
    return list_;
  };

  useEffect(() => {
    const systemItems = systems.map(system => ({
      label: system.systemName,
      value: system.systemId,
    }));
    setSystemItems(systemItems);
  }, [systems.length]);

  useEffect(() => {
    const codeItems = codes.map(code => ({
      label: code.codegroup.toString(), //화면표시
      value: code.codegroup, //DB CRUD값
    }));

    const list_ = deDupe(codeItems); //중복제거
    setCodesItems(getAllItemOption(list_));
  }, [codes.length]); //의존성배열

  return {
    roles,
    systems,
    roleItems,
    systemItems,
    codeItems,
    programMenus,
    isLoadedNav,
    loadSystems,
    loadCodes,
    loadProgramMenus,
  };
};

export default usePublic;
