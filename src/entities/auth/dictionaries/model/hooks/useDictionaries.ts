import {
  useGetDistricts,
  useGetOrganizations,
  useGetOrganizationTypes,
  useGetRegions,
} from "../api/queries";

export const useDictionaries = (args: {
  regionId: number;
  districtId: number;
  organizationTypeId: number;
}) => {
  const { regionId, districtId, organizationTypeId } = args;

  const regionsQ = useGetRegions();
  const districtsQ = useGetDistricts(regionId);
  const orgTypesQ = useGetOrganizationTypes();
  const orgsQ = useGetOrganizations(districtId, organizationTypeId);

  return { regionsQ, districtsQ, orgTypesQ, orgsQ };
};
