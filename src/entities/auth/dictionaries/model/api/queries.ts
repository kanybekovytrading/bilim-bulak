import { useQuery } from "@tanstack/react-query";
import {
  getDistricts,
  getOrganizations,
  getOrganizationTypes,
  getRegions,
} from "./endpoints";

export const useGetRegions = () => {
  return useQuery({ queryKey: ["regions"], queryFn: getRegions });
};

export const useGetDistricts = (regionId: number) => {
  return useQuery({
    queryKey: ["districts", regionId],
    queryFn: () => getDistricts(regionId),
    enabled: regionId > 0,
  });
};

export const useGetOrganizationTypes = () => {
  return useQuery({ queryKey: ["orgTypes"], queryFn: getOrganizationTypes });
};

export const useGetOrganizations = (
  districtId: number,
  organizationTypeId: number
) => {
  return useQuery({
    queryKey: ["organizations", districtId, organizationTypeId],
    queryFn: () => getOrganizations({ districtId, organizationTypeId }),
    enabled: districtId > 0 && organizationTypeId > 0,
  });
};
